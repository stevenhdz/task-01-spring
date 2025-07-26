package com.stevenalexander.hernandezjimenez2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Locale;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index(Locale locale) {
        System.out.println("Locale detectado: " + locale);
        return "index";
    }
}
