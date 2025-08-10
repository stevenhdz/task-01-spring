package stevenalexander.backend_hernandezjimenez.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import stevenalexander.backend_hernandezjimenez.dto.*;
import stevenalexander.backend_hernandezjimenez.model.User;
import stevenalexander.backend_hernandezjimenez.service.JwtUtil;
import stevenalexander.backend_hernandezjimenez.service.UserService;

import java.util.Map;
import java.util.Locale;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    private MessageSource messageSource;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req, Locale locale) {
        try {
            User u = userService.register(req.getName(), req.getEmail(), req.getPassword());
            var registerSuccessMsg = messageSource.getMessage("user.register.success", null, locale);
            return ResponseEntity.ok(new AuthResponse(null, registerSuccessMsg));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(Map.of("error", messageSource.getMessage("user.register.failed", null, locale)));
        }
    }

   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req, Locale locale) {
        var userOpt = userService.authenticate(req.getEmail(), req.getPassword());
        if (userOpt.isPresent()) {
            String token = jwtUtil.generateToken(userOpt.get().getEmail());
            return ResponseEntity.ok(new AuthResponse(token, messageSource.getMessage("user.login.success", null, locale)));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", messageSource.getMessage("user.login.failed", null, locale)));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String> payload, Locale locale) {
        String email = payload.get("email");
        try {
            String link = userService.createPasswordResetToken(email, locale);
            return ResponseEntity.ok(Map.of("message", messageSource.getMessage("user.forgotPassword.sent", null, locale)));
        } catch (RuntimeException ex) {
            return ResponseEntity.ok(Map.of("message", messageSource.getMessage("error.badRequest", null, locale)));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req, Locale locale) {
        try {
            userService.resetPassword(req.getToken(), req.getNewPassword());
            return ResponseEntity.ok(Map.of("message", messageSource.getMessage("user.resetPassword.success", null, locale)));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", messageSource.getMessage("user.resetPassword.failed", null, locale)));
        }
    }
}
