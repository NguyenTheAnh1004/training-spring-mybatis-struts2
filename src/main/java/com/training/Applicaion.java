package com.training;

import java.util.Date;
import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Configuration;



//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@SpringBootApplication
@ServletComponentScan
@MapperScan("com.training.mapper")
public class Applicaion{

	public static void main(String[] args) {

		SpringApplication.run(Applicaion.class, args);
		System.out.println("Date in UTC: " + new Date().toString());

	}
}