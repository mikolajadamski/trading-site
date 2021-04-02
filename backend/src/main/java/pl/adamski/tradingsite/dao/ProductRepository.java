package pl.adamski.tradingsite.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.adamski.tradingsite.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {
}
