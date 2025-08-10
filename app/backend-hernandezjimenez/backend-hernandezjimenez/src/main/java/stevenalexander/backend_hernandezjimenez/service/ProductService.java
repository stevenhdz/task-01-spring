package stevenalexander.backend_hernandezjimenez.service;

import org.springframework.stereotype.Service;
import stevenalexander.backend_hernandezjimenez.model.Product;
import stevenalexander.backend_hernandezjimenez.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> listAll() {
        return repo.findAll();
    }

    public List<Product> findByCategory(String categoryName) {
        return repo.findByCategory_NameIgnoreCase(categoryName);
    }

    public List<Product> searchByName(String query) {
        return repo.findByNameContainingIgnoreCase(query);
    }

    public Product getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Product save(Product product) {
        return repo.save(product);
    }
}
