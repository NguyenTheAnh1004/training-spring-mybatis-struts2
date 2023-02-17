package com.training.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.training.mapper.ProductsMapper;
import com.training.mapper.UsersMapper;
import com.training.model.Product;
import com.training.model.User;

public class ProductAction extends ActionSupport
		implements SessionAware, ParameterNameAware, ServletResponseAware, ServletRequestAware {

	private static final long serialVersionUID = 1L;
	@Autowired
	private ProductsMapper productsMapper;
	
	@Autowired
	private UsersMapper usersMapper;

	protected HttpServletRequest servletRequest;
	protected HttpServletResponse servletResponse;
	private Map<String, Object> userSession;

	public String REMEMBER_TOKEN = "remember_token";
	public static final String USER = "USER";
	public static final Integer tokenExpiredTime = 3600;

	private List<Product> products;
	private Long id;
	private String name;
	private BigDecimal prince;
	private String description;
	private Integer stt;

	private Integer page = 1;
	private Integer size = 5;
	private Integer princeFrom;
	private Integer princeTo;
	private Integer totalProducts;

	// manage
	public String productmanage() {
		if (getRememberToken() == null && userSession.get(REMEMBER_TOKEN) == null) {
			return "login";
		}
		if (getRememberToken() != null && usersMapper.getRememberToken(getRememberToken()) > 0) {
			User user1 = usersMapper.getMailByToken(getRememberToken());
			userSession.put(USER, user1.getEmail());
		}
		return SUCCESS;
	}

	public String insert() {
		Product product = new Product(this.name, this.prince, this.description, this.stt);
		product.setCreatedAt(new Date());
		productsMapper.insertProduct(product);
		return SUCCESS;
	}

	public String update() {
		Product product = new Product(this.id, this.name, this.prince, this.description, this.stt);
		productsMapper.updateProduct(product);
		return SUCCESS;
	}

	public String findBySearch() {
		System.out.println(this.name);
		this.products = productsMapper.getProductsBySearch((page - 1) * size, size, name, stt, princeFrom, princeTo);
		return SUCCESS;
	}

	public String findAllbySearch() {
		System.out.println(this.name);
		this.products = productsMapper.getAllProductsBySearch(name, stt, princeFrom, princeTo);
		this.totalProducts = productsMapper.countAllProductsBySearch(name, stt, princeFrom, princeTo);
		return SUCCESS;
	}

	public String delete() {
		productsMapper.deleteProduct(this.id);
		return SUCCESS;
	}

	public String findByPage() {
		this.products = productsMapper.getProductsByPage((page - 1) * size, size);
		return SUCCESS;
	}

	public String findAll() {
		this.products = productsMapper.getAllProducts();
		this.totalProducts = productsMapper.countAllProducts();
		return SUCCESS;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getPrince() {
		return prince;
	}

	public void setPrince(BigDecimal prince) {
		this.prince = prince;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getStt() {
		return stt;
	}

	public void setStt(Integer stt) {
		this.stt = stt;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public Integer getPrinceFrom() {
		return princeFrom;
	}

	public void setPrinceFrom(Integer princeFrom) {
		this.princeFrom = princeFrom;
	}

	public Integer getPrinceTo() {
		return princeTo;
	}

	public void setPrinceTo(Integer princeTo) {
		this.princeTo = princeTo;
	}

	public Integer getTotalProducts() {
		return totalProducts;
	}

	public void setTotalProducts(Integer totalProducts) {
		this.totalProducts = totalProducts;
	}

	public Integer getTokenExpiredTime() {
		if (servletRequest.getCookies() != null)
			for (Cookie c : servletRequest.getCookies()) {
				if (c.getName().equals(REMEMBER_TOKEN)) {

					return c.getMaxAge();
				}

			}
		return -1;
	}

	public String getRememberToken() {
		if (servletRequest.getCookies() != null)
			for (Cookie c : servletRequest.getCookies()) {
				if (c.getName().equals(REMEMBER_TOKEN))

					return c.getValue();
			}
		return null;
	}

	public String getNameCurrentUser() {
		for (Cookie c : servletRequest.getCookies()) {
			if (c.getName().equals(USER))
				return c.getValue();
		}
		return null;
	}

	// end current cookie

	// HTTP REQ RES
	@Override
	public void setServletResponse(HttpServletResponse servletResponse) {
		this.servletResponse = servletResponse;
	}

	@Override
	public void setServletRequest(HttpServletRequest servletRequest) {
		this.servletRequest = servletRequest;
	}
	// End HTTP REQ RES

	@Override
	public boolean acceptableParameterName(String parameterName) {
		return !parameterName.contains("session") && !parameterName.contains("request");
	}

	@Override
	public void setSession(Map<String, Object> session) {
		userSession = session;

	}

}
