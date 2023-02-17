package com.training.mapper;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.training.model.Product;
import com.training.model.User;

@Mapper
public interface ProductsMapper {

	public List<Product> getAllProducts();
	
	public Integer countAllProducts();

	public List<Product> getProductsByPage(@Param("page") Integer page, @Param("size") Integer size);

	public void insertProduct(@Param("product") Product product);

	public void insertTest();

	public void updateProduct(@Param("product") Product product);

	public void deleteProduct(@Param("id") Long id);

	public List<Product> getProductsBySearch(@Param("page") Integer page, @Param("size") Integer size,
			@Param("name") String name, @Param("active") Integer active, @Param("princefrom") Integer princefrom,
			@Param("princeto") Integer princeto);

	public List<Product> getAllProductsBySearch(@Param("name") String name, @Param("active") Integer active,
			@Param("princefrom") Integer princefrom, @Param("princeto") Integer princeto);
	
	public Integer countAllProductsBySearch(@Param("name") String name, @Param("active") Integer active,
			@Param("princefrom") Integer princefrom, @Param("princeto") Integer princeto);
}
