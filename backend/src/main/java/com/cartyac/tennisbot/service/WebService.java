package com.cartyac.tennisbot.service;

import com.cartyac.tennisbot.dto.booking.BillingDetails;
import com.cartyac.tennisbot.dto.booking.CardDetails;
import com.cartyac.tennisbot.dto.booking.PaymentDetails;
import com.cartyac.tennisbot.model.Booking;
import com.cartyac.tennisbot.model.Location;
import com.fasterxml.jackson.databind.ObjectMapper;
import jnr.a64asm.Offset;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

import static org.aspectj.util.FileUtil.copyFile;

@Service
public class WebService {

    private static final String LOGIN_URL = "https://myaccount.better.org.uk/login?redirect=/";
    private static final String CHECKOUT_URL = "https://bookings.better.org.uk/basket/checkout";
    private static final String MOUNTED_PATH = "/app";
    private static final Path TARGET_FILE = Paths.get(MOUNTED_PATH, "dates_log.txt");
    private static final Logger log = LoggerFactory.getLogger(WebService.class);

    private final Environment env;
    private final ResourceLoader resourceLoader;
    private final String username;
    private final String password;

    private Set<Cookie> cookies;
    WebDriver driver;


    @Autowired
    public WebService(Environment env, ResourceLoader resourceLoader) {
        cookies = Set.of();
        log.info("Initializing WebService...");
        this.env = env;
        this.resourceLoader = resourceLoader;
        this.username = env.getProperty("better.tennis.username");
        this.password = env.getProperty("better.tennis.password");
        login();
    }

    private WebDriver initializeWebDriver() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");  // Run in headless mode
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        return new ChromeDriver(options);
    }

    /**
     * Parses the date from the date-time and returns it in the format yyyy/mm/dd.
     * @param bookingTime
     * @return
     */
    public static String formatDate(OffsetDateTime bookingTime) {
        return bookingTime.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    public void login(){
        driver = initializeWebDriver();
        log.info("Logging in...");
        try {
            driver.get(LOGIN_URL);
            driver.navigate().refresh();

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
            wait.until(ExpectedConditions.presenceOfElementLocated(By.name("username")));

            WebElement usernameInput = driver.findElement(By.name("username"));
            WebElement passwordInput = driver.findElement(By.name("password"));
            WebElement form = driver.findElement(By.name("form"));

            usernameInput.sendKeys(username);
            passwordInput.sendKeys(password);
            form.submit();

            cookies = driver.manage().getCookies();
            log.info("Logged in successfully.");
        } catch (Exception e) {
            log.error(
                    "Failed to log in: {}",
                    e.getMessage()
            );
        }
    }

    public boolean isLoggedIn() {
        try {
            driver.get(LOGIN_URL);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
            wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText("Log out")));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void getUrl(String url){
        try {
            driver.get(url);
        } catch (WebDriverException e){
            driver = initializeWebDriver();
            driver.get(url);
        }
    }

    public void makeBooking(Booking booking){
        try {
            OffsetDateTime time = booking.getBookingTime();
            Location location = booking.getLocation();
            String formattedDate = convertDateSyntax(time);
            String rootUrl = location.getUrl();
            String url = rootUrl + formattedDate;

            log.info("Attempting to make booking at {} for {}", location.getName(), time);

            getUrl(url);
            log.info("Accessing {}", url);

            String timeslot = getTimeslot(time);
            String xpath = "//a[contains(@href, '/slot/" + timeslot + "')]/button";

            // Create an instance of WebDriverWait with a 10-second timeout
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            Thread.sleep(3000);

            String urlAfterRedirect = driver.getCurrentUrl().split(rootUrl)[1].split("/")[0];
            if (!urlAfterRedirect.equals(formattedDate)) {
                throw new RuntimeException("Failed to access the correct date page.");
            }

            // Handle potential cookie consent banner
            try {
                WebElement cookieBanner = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("onetrust-accept-btn-handler")));
                if (cookieBanner.isDisplayed()) {
                    cookieBanner.click();
                    log.info("Cookie banner accepted.");
                }
            } catch (Exception e) {
                // If no cookie banner is found, continue
                log.info("No cookie banner found.");
            }

            // Wait until the button is clickable
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xpath)));

            // Perform a click operation on the button
            button.click();

            // Construct the XPath to find the "Book now" span
            String bookNowSpanXPath = "//span[contains(text(), 'Book now')]";

            // Wait until the "Book now" span is visible
            WebElement bookNowSpan = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(bookNowSpanXPath)));

            // Navigate to the parent button element
            WebElement bookNowButton = bookNowSpan.findElement(By.xpath("./ancestor::button"));

            // Scroll the button into view if necessary
            ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", bookNowButton);

            // Try clicking using JavaScript if normal click fails
            try {
                bookNowButton.click();
            } catch (ElementClickInterceptedException e) {
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", bookNowButton);
            }


            debugScreenshot();
            /**
             * check courts
             * outer component
             */
            wait.until(ExpectedConditions.urlToBe(CHECKOUT_URL));

            submitPaymentForm();

        } catch (Exception e) {
            log.error(
                    "Failed to make booking: {}",
                    e.getMessage()
            );
        }
    }

    private void debugScreenshot(){
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File srcFile = screenshot.getScreenshotAs(OutputType.FILE);
            File destFile = new File("screenshot.png");
            copyFile(srcFile, destFile);
        } catch (IOException e){
            log.error("Could not take screenshot", e);
        }
    }

    /**
     * Assuming you are on the CHECKOUT URL
     */
    private void submitPaymentForm() throws IOException {
        String payNowSpanXPath = "//span[contains(text(), 'Pay ')]";
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement payNowSpan = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(payNowSpanXPath)));

        // Navigate to the parent button element
        WebElement payNowButton = payNowSpan.findElement(By.xpath("./ancestor::span"))
                .findElement(By.xpath("./ancestor::button"));

        PaymentDetails paymentDetails = getPaymentDetails();
        fillBillingForm(paymentDetails.billingDetails());
        fillCardDetails(paymentDetails.cardDetails());
        //payNowButton.click();

        debugScreenshot();
    }

    private PaymentDetails getPaymentDetails() {
        ObjectMapper mapper = new ObjectMapper();
        Resource resource = resourceLoader.getResource("classpath:payment-details.json");
        try (InputStream inputStream = resource.getInputStream()){
            return mapper.readValue(inputStream, PaymentDetails.class);
        } catch (IOException e){
            log.error("Error getting payment details, check file is available", e);
            return null;
        }
    }

    private void fillBillingForm(BillingDetails billingDetails){
        // Locate the form elements using the name attribute
        WebElement firstNameField = driver.findElement(By.name("billingFirstName"));
        WebElement lastNameField = driver.findElement(By.name("billingLastName")); // Adjust the name
        WebElement addressLine1Field = driver.findElement(By.name("billingAddressLineOne")); // Adjust the name
        WebElement townCityField = driver.findElement(By.name("billingCity")); // Adjust the name
        WebElement postcodeField = driver.findElement(By.name("billingPostcode")); // Adjust the name

        // Fill out the form
        firstNameField.sendKeys(billingDetails.firstName());
        lastNameField.sendKeys(billingDetails.lastName());
        addressLine1Field.sendKeys(billingDetails.addressLine1());
        townCityField.sendKeys(billingDetails.town());
        postcodeField.sendKeys(billingDetails.postcode());
    }

    private void fillCardDetails(CardDetails cardDetails){
        // Locate the form elements using the name attribute
        WebElement cardholderName = driver.findElement(By.name("cardholderName"));
        WebElement cardNumber = driver.findElement(By.name("cardNumber")); // Adjust the name
        WebElement expiryDate = driver.findElement(By.name("expiryDate")); // Adjust the name
        WebElement securityCode = driver.findElement(By.name("securityCode")); // Adjust the name

        // Fill out the form
        cardholderName.sendKeys(cardDetails.cardholderName());
        cardNumber.sendKeys(cardDetails.cardNumber());
        expiryDate.sendKeys(cardDetails.expiryDate());
        securityCode.sendKeys(cardDetails.securityCode());
    }

    /**
     * Returns date in the format of YYYY-MM-DD
     * @param time
     * @return
     */
    private String convertDateSyntax(OffsetDateTime time){
        return time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    private String getTimeslot(OffsetDateTime time){
        int hour = time.getHour();
        return String.format("%02d:00-%02d:00", hour, hour+1);
    }

//    public void checkNextDateAvailability(String url) {
//        try {
//            driver.get(url);
//
//            // Wait for the date ribbon component to be present
//            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
//            wait.until(ExpectedConditions.presenceOfElementLocated(By.className("DateRibbonComponent__DatesWrapper-sc-p1q1bx-1")));
//
//            // Parse the page content
//            Document soup = Jsoup.parse(driver.getPageSource());
//
//            Elements dateRibbon = soup.select("div.DateRibbonComponent__DatesWrapper-sc-p1q1bx-1");
//
//            if (!dateRibbon.isEmpty()) {
//                Elements dates = dateRibbon.select("a.DateComponent__Wrapper-sc-1821zu4-0");
//                List<String> newDates = new ArrayList<>();
//                for (org.jsoup.nodes.Element date : dates) {
//                    String href = date.attr("href");
//                    String dateString = href.split("/tennis-court-outdoor/")[1].split("/")[0];
//                    if (!"undefined".equals(dateString)) {
//                        newDates.add(dateString);
//                    }
//                }
//
//                // Read existing dates from the target file
//                List<String> existingDates;
//                try {
//                    existingDates = Files.readAllLines(TARGET_FILE);
//                } catch (NoSuchFileException e) {
//                    existingDates = new ArrayList<>();
//                }
//
//                // Write new dates to the file if not already present
//                for (String date : newDates) {
//                    String entry = date + " - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//                    if (existingDates.stream().noneMatch(existingEntry -> existingEntry.contains(date))) {
//                        Files.write(TARGET_FILE, (entry + System.lineSeparator()).getBytes(), StandardOpenOption.APPEND, StandardOpenOption.CREATE);
//                        System.out.println("New date written to file: " + entry);
//                        existingDates.add(entry);
//                    }
//                }
//
//                System.out.println("No new date available as of " + LocalDateTime.now());
//            } else {
//                System.out.println("Could not find the date ribbon component.");
//            }
//
//        } catch (Exception e) {
//            System.out.println("An error occurred: " + e.getMessage());
//
//        }
//    }
}
