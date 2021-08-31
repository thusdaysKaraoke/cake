package it.bst1.cake;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Configuration
public class GsonConfig {
	
	@Bean
    public Gson getGson() {
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
    	return gson;
    }
}
