package com.training.conf;

import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.training.mapper.UsersMapper;

//@Configuration
//public class MybatisConf {
//	  @Bean
//	  public MapperFactoryBean<UsersMapper> userMapper() throws Exception {
//	    MapperFactoryBean<UsersMapper> factoryBean = new MapperFactoryBean<>(UsersMapper.class);
////	    factoryBean.setSqlSessionFactory(sqlSessionFactory());
//	    return factoryBean;
//	  }
//}
