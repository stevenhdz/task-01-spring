package stevenalexander.backend_hernandezjimenez.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import stevenalexander.backend_hernandezjimenez.model.PasswordResetToken;
import stevenalexander.backend_hernandezjimenez.model.User;
import stevenalexander.backend_hernandezjimenez.repository.PasswordResetTokenRepository;
import stevenalexander.backend_hernandezjimenez.repository.UserRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.Locale;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository,
                       PasswordResetTokenRepository tokenRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // Registro (RF1)
    public User register(String name, String email, String rawPassword) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email ya registrado");
        }
        String hashed = passwordEncoder.encode(rawPassword);
        User u = new User(email, hashed, name, "USER");
        return userRepository.save(u);
    }

    public Optional<User> authenticate(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }

    public String createPasswordResetToken(String email, Locale locale) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        String token = UUID.randomUUID().toString();
        Instant expiry = Instant.now().plusSeconds(3600); // 1 hora
        PasswordResetToken prt = new PasswordResetToken(token, user, expiry);
        tokenRepository.save(prt);

        String link = "http://localhost:3000/#/reset?token=" + token;
        emailService.sendPasswordRecoveryEmail(user.getEmail(), link, locale);

        return link;
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken prt = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));
        if (prt.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Token expirado");
        }
        User user = prt.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(prt);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
