package stevenalexander.backend_hernandezjimenez.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stevenalexander.backend_hernandezjimenez.model.Category;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameIgnoreCase(String name);
}
