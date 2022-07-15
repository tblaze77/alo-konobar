package com.example.ekonobarserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EKonobarServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(EKonobarServerApplication.class, args);
	}

	//Injecting bean to change default password encoder to bcrypt
	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
}


