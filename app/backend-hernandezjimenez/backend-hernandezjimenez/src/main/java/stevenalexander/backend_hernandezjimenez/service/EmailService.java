package stevenalexander.backend_hernandezjimenez.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailException;

import java.util.Locale;

@Service
public class EmailService {

    @Autowired
    private MessageSource messageSource;

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordRecoveryEmail(String to, String link, Locale locale) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(messageSource.getMessage("user.forgotPassword.subject", null, locale));
            message.setText(messageSource.getMessage("user.forgotPassword.message", null, locale) + link);
            mailSender.send(message);
            System.out.println(messageSource.getMessage("user.forgotPassword.sent", null, locale) + to);
        } catch (MailException e) {
            System.err.println(messageSource.getMessage("user.forgotPassword.error", null, locale) + e.getMessage());
            throw e;
        }
    }
}
