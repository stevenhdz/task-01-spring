package stevenalexander.backend_hernandezjimenez.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
@RequestMapping("/test-db")
public class TestDBController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private MessageSource messageSource;


    @GetMapping
    public String testConnection(Locale locale) {
        try {
            jdbcTemplate.execute("SELECT 1");
            return messageSource.getMessage("db.connection.success", null, locale);
        } catch (Exception e) {
            return messageSource.getMessage("db.connection.failed", null, locale);
        }
    }
}