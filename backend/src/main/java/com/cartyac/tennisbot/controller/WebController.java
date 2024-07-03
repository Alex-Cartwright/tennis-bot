package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.service.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

public class WebController {

    private final WebService webService;

    @Autowired
    public WebController(WebService webService) {
        this.webService = webService;
    }
}
