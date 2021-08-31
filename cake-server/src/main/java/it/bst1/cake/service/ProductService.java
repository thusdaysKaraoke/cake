package it.bst1.cake.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.bst1.cake.bean.Product;
import it.bst1.cake.bean.ProductType;

@Service
public class ProductService {
	

	@Autowired MongoService mongoService;
	@Autowired ProductTypeService typeService;
	
	private static Logger log = LogManager.getLogger(ProductService.class);

	public Product insert(Product product) {
		
		Long id = mongoService.getNewId("product");
		product.setId(id);
		
		return mongoService.insertProduct(product);
	}

	public Product getById(Long id) {
		return mongoService.getProductById(id);
	}

	public ProductType getProductTypeById(Long id) {
		return mongoService.getProductTypeById(id);
	}

	public Product update(Product product) {
		return mongoService.updateProduct(product);
	}

	public void delete(Long id) {
		mongoService.deleteProductById(id);
		
	}
	
	public List<Product> getAllProducts() {
		return getAllProducts(false);
	}

	public List<Product> getAllProducts(Boolean avoidExpired) {
		List<Product> products = mongoService.getProducts(avoidExpired);
		calculateCurrentProductsPrice(products);
		return products;
	}
	
	private void calculateCurrentProductsPrice(List<Product> products) {
         		
		products.forEach(p -> {
			
			LocalDate localDate = Instant.ofEpochMilli(p.getCreationDate().getTime())
				      .atZone(ZoneId.systemDefault())
				      .toLocalDate();
			
	        Integer result = (int) ChronoUnit.DAYS.between(localDate, LocalDate.now());

	        ProductType type = typeService.getProductType(p.getType());

	        switch (result) {
		        case 0:
			        p.setCurrentPrice(type.getPrice());
		        	break;
		        case 1:
		        	p.setCurrentPrice(type.getPrice()*0.8);
		        	break;
		        case 2:
		        	p.setCurrentPrice(type.getPrice()*0.2);
		        	break;
	        }

		});
	}




}
