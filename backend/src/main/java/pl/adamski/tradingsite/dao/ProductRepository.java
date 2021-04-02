package pl.adamski.tradingsite.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.adamski.tradingsite.entity.Product;

@CrossOrigin()
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
