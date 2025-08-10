package stevenalexander.backend_hernandezjimenez.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import stevenalexander.backend_hernandezjimenez.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
