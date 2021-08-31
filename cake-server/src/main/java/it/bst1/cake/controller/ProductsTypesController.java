package it.bst1.cake.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.bst1.cake.bean.Product;
import it.bst1.cake.bean.ProductType;
import it.bst1.cake.service.ProductTypeService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://cake-client:4200"})
@RequestMapping({ "/types"})
public class ProductsTypesController {
	
	@Autowired ProductTypeService productTypeService;
	
	@GetMapping("")
	public  ResponseEntity<List<ProductType>> getAll() {
		
		List<ProductType> productTypes = productTypeService.getAllProductTypes();
		
		return new ResponseEntity<List<ProductType>>(productTypes, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public  ResponseEntity<ProductType> getById(@PathVariable("id") Long id) {
		
		ProductType productType = productTypeService.getProductType(id);
		
		if (productType == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<ProductType>(productType, HttpStatus.OK);
	}
	
}
