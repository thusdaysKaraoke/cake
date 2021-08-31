package it.bst1.cake.service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;

import it.bst1.cake.MongoConfig;
import it.bst1.cake.bean.Product;
import it.bst1.cake.bean.ProductType;
import it.bst1.cake.bean.User;

@Service
public class MongoService {
	
	@Autowired Gson gson;
	
	@Autowired MongoDatabase db;
	
	private static Logger log = LogManager.getLogger(ProductService.class);


	public Product insertProduct(Product product) {
		org.bson.Document bsonDocument = org.bson.Document.parse(gson.toJson(product));
		db.getCollection(MongoConfig.PRODUCTS_COLLECTION).insertOne(bsonDocument);
		
		log.info("New product created" + product.getId());

		return gson.fromJson(bsonDocument.toJson(), Product.class);		
	}
	
	public Product updateProduct(Product product) {
		
		log.info("Updating product " + product.getId());

		org.bson.Document bsonDocument = org.bson.Document.parse(gson.toJson(product));
		
		BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("id", product.getId());
		
		UpdateResult update = db.getCollection(MongoConfig.PRODUCTS_COLLECTION).replaceOne(searchQuery, bsonDocument);

		if (update.getModifiedCount() == 0) {
			return null;
		}
		
		return product;
	}
	
	public Product getProductById(Long id) {
		
		BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("id", id);
		
		log.info("Executing query " + searchQuery.toJson());

		org.bson.Document document = db.getCollection(MongoConfig.PRODUCTS_COLLECTION).find(searchQuery).first();

		if (document == null) {
			return null;
		}

		return gson.fromJson(document.toJson(), Product.class);
	}

	public Product deleteProductById(Long id) {
		BasicDBObject filter = new BasicDBObject();
		filter.put("id", id);

		org.bson.Document bsonDocument = db.getCollection(MongoConfig.PRODUCTS_COLLECTION).findOneAndDelete(filter);
		if (bsonDocument == null) {
			log.info("Product not found: " + filter.toJson());
			return null;
		}
		
		log.info("Product erased " + id);
		
		return gson.fromJson(bsonDocument.toJson(), Product.class);
		
	}

	public List<Product> getProducts(Boolean avoidExpired) {
		
		List<Product> results = new ArrayList<Product>();
		
		BasicDBObject filter = new BasicDBObject();
		
		if (avoidExpired) {
				
			LocalDate localDate = Instant.ofEpochMilli(new Date().getTime())
		      .atZone(ZoneId.systemDefault())
		      .toLocalDate();
			
	        Date startDate = Date.from(localDate.minusDays(2).atStartOfDay(ZoneId.systemDefault()).toInstant());
	        Date endDate = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

			BasicDBObject operators = new BasicDBObject();
			operators.put("$gte", new SimpleDateFormat("yyyy-MM-dd").format(startDate));
			operators.put("$lte", new SimpleDateFormat("yyyy-MM-dd").format(endDate));
			filter.put("creationDate", operators);
			
			}
		long count = db.getCollection(MongoConfig.PRODUCTS_COLLECTION).countDocuments(filter);

		log.info("Getting all products, query: "+gson.toJson(filter)+ " count"+count);

		MongoCursor<Document> searchResults = db.getCollection(MongoConfig.PRODUCTS_COLLECTION).find(filter).iterator();
		
		while (searchResults.hasNext()) {
			results.add(gson.fromJson(searchResults.next().toJson(), Product.class));
		};
		
		return results;
	}

	public ProductType getProductTypeById(Long id) {
		BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("id", id);
		
		log.info("Looking for productType " + searchQuery.toJson());

		org.bson.Document document = db.getCollection(MongoConfig.TYPES_COLLECTION).find(searchQuery).first();

		if (document == null) {
			return null;
		}

		return gson.fromJson(document.toJson(), ProductType.class);
	}
	
	public List<ProductType> getProductTypes() {
		List<ProductType> results = new ArrayList<ProductType>();
		MongoCursor<Document> searchResults = db.getCollection(MongoConfig.TYPES_COLLECTION).find().iterator();
		
		while (searchResults.hasNext()) {
			results.add(gson.fromJson(searchResults.next().toJson(), ProductType.class));
		};
		
		return results;
	}
	
	public Long getNewId(String key) {
		
		log.info("Getting next id for key " + key);
		
		MongoCollection<Document> countersCollection = db.getCollection(MongoConfig.COUNTERS_COLLECTION);

		BasicDBObject filter = new BasicDBObject();
		filter.put("key", key);

		BasicDBObject update = new BasicDBObject();
		update.put("$inc", new BasicDBObject().append("count", Long.valueOf(1l)));		

		org.bson.Document result = countersCollection.findOneAndUpdate(filter, update);

		if (result == null) {

			org.bson.Document newCounter = new org.bson.Document();
			newCounter.append("key", key);
			newCounter.append("count", Long.valueOf(1l));

			countersCollection.insertOne(newCounter);

			return Long.valueOf(1l);
		}

		return result.getLong("count");
	}
	
	public User authenticateUser(String id, String password) {
		String query = String.format("{'password':'%s','$or':[{'username':'%s'}, {'mail':'%s'}]}", password, id, id);
		
		BasicDBObject bson = gson.fromJson(query, BasicDBObject.class);
		
		Document result = db.getCollection(MongoConfig.USERS_COLLECTION).find(bson).first();
		
		if (result == null) {
			return null;
		}
		
		return gson.fromJson(result.toJson(), User.class);
	}
	
}
