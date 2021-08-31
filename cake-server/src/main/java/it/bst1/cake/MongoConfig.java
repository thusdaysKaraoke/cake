package it.bst1.cake;

import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.gson.Gson;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

@Configuration
public class MongoConfig {

	@Autowired
	private Gson gson;
	
	private static Logger log = LogManager.getLogger(MongoConfig.class);
	
	public final static String PRODUCTS_COLLECTION = "products";
	public final static String TYPES_COLLECTION = "types";
	public final static String USERS_COLLECTION = "users";
	public final static String COUNTERS_COLLECTION = "counters";

	public List<String> collections = Arrays.asList(
			PRODUCTS_COLLECTION,
			TYPES_COLLECTION,
			USERS_COLLECTION,
			COUNTERS_COLLECTION
			);
	
	@Value("${datasource.mongo.url}")
	String url;
	@Value("${datasource.mongo.port}")
	Integer port;
	@Value("${datasource.mongo.database}")
	String database;
	@Value("${datasource.mongo.username}")
	String username;
	@Value("${datasource.mongo.password}")
	String password;

	@Bean
	public MongoClient mongoClient() throws IOException {

		ConnectionString connection = new ConnectionString("mongodb://" + url + ":" + port + "/" + database);

		MongoClientSettings mongoClientSettings = MongoClientSettings.builder().applyConnectionString(connection)
				.credential(MongoCredential.createCredential(username, database, password.toCharArray()))
				.build();

		return MongoClients.create(mongoClientSettings);

	}
	
	@Bean 
	public MongoDatabase getClient() throws IOException {
	
		MongoClient mongoClient = mongoClient();
		
		MongoDatabase mongoDb = mongoClient.getDatabase(database); 

		existsOrCreate(mongoDb, collections);
		
		return mongoDb;
	}
	
	private void existsOrCreate(MongoDatabase db, List<String> collections) {
	
		List<String> collectionsOnDb = db.listCollectionNames().into(new LinkedList<String>());

		collections.forEach(collection -> {
			if (!collectionsOnDb.contains(collection)) {
				db.createCollection(collection);
				log.info("New collection created: "+collection);
			}
		});	
	}
	
}
