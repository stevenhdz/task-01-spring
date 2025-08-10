package stevenalexander.backend_hernandezjimenez.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import stevenalexander.backend_hernandezjimenez.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}
