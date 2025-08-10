package stevenalexander.backend_hernandezjimenez.i18n.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;

@Configuration
public class WebConfig {

    @Bean
    public LocaleResolver localeResolver() {
        return new LocaleConfig();
    }
}
