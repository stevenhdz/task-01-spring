package com.stevenalexander.hernandezjimenez.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.security.core.context.SecurityContextHolder;

@Controller
public class HomeController {

    @GetMapping("/public")
    @ResponseBody
    public String publicPage() {
        return "Página pública - acceso libre";
    }

    @GetMapping("/user")
    @ResponseBody
    public String userPage() {
        return "Página para usuarios USER o ADMIN autenticados";
    }

    @GetMapping("/admin")
    @ResponseBody
    public String adminPage() {
        return "Página exclusiva para ADMIN";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }


    @GetMapping("/home")
    @ResponseBody
    public String homePage() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String userLink = "<br><a href='/user'>user</a>";
        String adminLink = "<br><a href='/admin'>admin</a>";
        String welcome = "Inicio de sesión correcto. Bienvenido ";
        String authorization = " puedes acceder a las siguientes paginas";

        if (username.equals("admin")) {
            return welcome + username + authorization + adminLink + userLink;
        }

        return welcome + username + authorization + userLink;
    }
}
