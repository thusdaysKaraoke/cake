package it.bst1.cake.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.bst1.cake.bean.Product;
import it.bst1.cake.service.ProductService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://cake-client:4200"})
@RequestMapping({ "/products/manager"})
public class ProductsManagerController {
	
	@Autowired
	ProductService productService;

	
	@GetMapping("")
	public ResponseEntity<List<Product>> getProducts() {
		List<Product> products = productService.getAllProducts();
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<Product> insert(@RequestBody Product product) {
		Product createdProduct = productService.insert(product);
		return new ResponseEntity<Product>(createdProduct, HttpStatus.CREATED);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> get(@PathVariable("id") Long id) {
		
		Product product = productService.getById(id);
		
		if (product == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Product> update(@PathVariable("id") Long id, @RequestBody Product product) {
		
		product.setId(id);
		product = productService.update(product);
		
		return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Product> delete(@PathVariable("id") Long id) {
		
		productService.delete(id);
		return new ResponseEntity<>(null, HttpStatus.ACCEPTED);
	}
	
	
}
