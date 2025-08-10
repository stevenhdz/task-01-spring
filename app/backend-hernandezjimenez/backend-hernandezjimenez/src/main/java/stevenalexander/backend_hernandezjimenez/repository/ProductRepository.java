package stevenalexander.backend_hernandezjimenez.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stevenalexander.backend_hernandezjimenez.model.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory_NameIgnoreCase(String name);
    List<Product> findByNameContainingIgnoreCase(String namePart);
}
