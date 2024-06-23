package com.cartyac.tennisbot.service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.nio.file.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class WebService {

    private static final String URL = "https://bookings.better.org.uk/location/islington-tennis-centre/tennis-court-outdoor/2024-06-20/by-time";
    private static final String MOUNTED_PATH = "/app";
    private static final Path TARGET_FILE = Paths.get(MOUNTED_PATH, "dates_log.txt");

    public static void checkNextDateAvailability() {
        WebDriver driver = null;

        try {
            // Set up the WebDriver
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--headless");  // Run in headless mode
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            driver = new ChromeDriver(options);

            driver.get(URL);

            // Wait for the date ribbon component to be present
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
            wait.until(ExpectedConditions.presenceOfElementLocated(By.className("DateRibbonComponent__DatesWrapper-sc-p1q1bx-1")));

            // Parse the page content
            Document soup = Jsoup.parse(driver.getPageSource());

            Elements dateRibbon = soup.select("div.DateRibbonComponent__DatesWrapper-sc-p1q1bx-1");

            if (!dateRibbon.isEmpty()) {
                Elements dates = dateRibbon.select("a.DateComponent__Wrapper-sc-1821zu4-0");
                List<String> newDates = new ArrayList<>();
                for (org.jsoup.nodes.Element date : dates) {
                    String href = date.attr("href");
                    String dateString = href.split("/tennis-court-outdoor/")[1].split("/")[0];
                    if (!"undefined".equals(dateString)) {
                        newDates.add(dateString);
                    }
                }

                // Read existing dates from the target file
                List<String> existingDates;
                try {
                    existingDates = Files.readAllLines(TARGET_FILE);
                } catch (NoSuchFileException e) {
                    existingDates = new ArrayList<>();
                }

                // Write new dates to the file if not already present
                for (String date : newDates) {
                    String entry = date + " - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    if (existingDates.stream().noneMatch(existingEntry -> existingEntry.contains(date))) {
                        Files.write(TARGET_FILE, (entry + System.lineSeparator()).getBytes(), StandardOpenOption.APPEND, StandardOpenOption.CREATE);
                        System.out.println("New date written to file: " + entry);
                        existingDates.add(entry);
                    }
                }

                System.out.println("No new date available as of " + LocalDateTime.now());
            } else {
                System.out.println("Could not find the date ribbon component.");
            }

        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());

        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("Starting Tennis Bot");
        checkNextDateAvailability();
    }
}
