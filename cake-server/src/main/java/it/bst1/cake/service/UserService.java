package it.bst1.cake.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import it.bst1.cake.bean.User;

@Service
public class UserService {
	
	@Autowired Gson gson;
	
	@Autowired MongoService mongoService;

	public User authenticateUser(String id, String password) {
		return mongoService.authenticateUser(id, password);
	}
}
