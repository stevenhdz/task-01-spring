package stevenalexander.backend_hernandezjimenez.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import stevenalexander.backend_hernandezjimenez.model.Product;
import stevenalexander.backend_hernandezjimenez.service.ProductService;

import java.util.List;
import java.util.Map;
import java.util.Locale;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService svc;
    public ProductController(ProductService svc) { this.svc = svc; }

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    public List<Product> all(@RequestParam(required = false) String category) {
        if (category == null || category.isBlank()) return svc.listAll();
        return svc.findByCategory(category);
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return svc.getById(id);
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam("q") String q) {
        return svc.searchByName(q);
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        return svc.save(p);
    }
}
