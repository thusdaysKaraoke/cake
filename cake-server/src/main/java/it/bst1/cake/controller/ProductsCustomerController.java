package it.bst1.cake.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.bst1.cake.bean.Credentials;
import it.bst1.cake.bean.Product;
import it.bst1.cake.bean.User;
import it.bst1.cake.service.ProductService;
import it.bst1.cake.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://cake-client:4200"})
@RequestMapping({ "/products/customer"})
public class ProductsCustomerController {
	
	@Autowired
	ProductService productService;

	@GetMapping("")
	public  ResponseEntity<List<Product>> getAll() {
		
		List<Product> products = productService.getAllProducts(true);
		
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> get(@PathVariable("id") Long id) {
		
		Product product = productService.getById(id);
		
		if (product == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}
	

	@Autowired UserService userService;

	@PostMapping("/test")
	public ResponseEntity<User> login(@RequestBody Credentials credentials) {
		
		User user = userService.authenticateUser(credentials.getId(), credentials.getPassword());
		
		if (user == null) {
		    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
	    return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
}
