package it.bst1.cake.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.bst1.cake.bean.ProductType;

@Service
public class ProductTypeService {
	
	@Autowired MongoService mongoService;

	public List<ProductType> getAllProductTypes() {
		return mongoService.getProductTypes();
	}

	public ProductType getProductType(Long type) {
		return mongoService.getProductTypeById(type);
	}
	
}
