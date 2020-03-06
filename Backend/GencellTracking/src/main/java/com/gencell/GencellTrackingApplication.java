package com.gencell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan (basePackages="com.gencell, com.gencell.dto, com.gencell.entities, com.gencell.repositories, com.gencell.services")
@EntityScan(basePackages = {"com.gencell.entities"}) 
@EnableJpaRepositories ("com.gencell.repositories")
public class GencellTrackingApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(GencellTrackingApplication.class, args);
	}

}
