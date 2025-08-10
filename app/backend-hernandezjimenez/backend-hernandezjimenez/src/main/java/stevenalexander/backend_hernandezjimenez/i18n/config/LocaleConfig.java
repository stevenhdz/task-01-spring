package stevenalexander.backend_hernandezjimenez.i18n.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;
import java.util.Locale;
import java.util.Arrays;

public class LocaleConfig extends AcceptHeaderLocaleResolver {

    private static final Locale DEFAULT_LANGUAGE = Locale.ENGLISH;

    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String headerLang = request.getHeader("Accept-Language");
        if (headerLang == null || headerLang.isEmpty()) {
            return DEFAULT_LANGUAGE;
        }
        return Locale.lookup(
            Locale.LanguageRange.parse(headerLang),
            Arrays.asList(Locale.getAvailableLocales())
        );
    }
}