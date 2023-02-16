package com.training.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "products")
public class Product extends Abtract {
	
	@Column(name = "createAt")
	private Date createdAt = new Date();
	
	@Column(name = "name", length = 500, unique = true)
	private String name;

	@Column(name = "prince", precision = 13, scale = 2)
	private BigDecimal prince;

	@Lob
	@Column(name = "short_description", length = 500)
	private String shortDes;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "discount")
	private Integer discount;

	@Column(name = "code", unique = true)
	private String code;

	@Column(name = "view")
	private Integer view;

	@Column(name = "image")
	private String image;
	
	@Column(name = "active")
	private Integer active;

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

	public String getShortDes() {
		return shortDes;
	}

	public void setShortDes(String shortDes) {
		this.shortDes = shortDes;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getView() {
		return view;
	}

	public void setView(Integer view) {
		this.view = view;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	

	public Integer getActive() {
		return active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Product(String name, BigDecimal prince, String shortDes, Integer active) {
		super();
		this.name = name;
		this.prince = prince;
		this.shortDes = shortDes;
		this.active = active;
	}

	public Product() {
		super();
	}
	
	public Product(Long id, String name, BigDecimal prince, String shortDes, Integer active) {
		super();
		this.id = id;
		this.name = name;
		this.prince = prince;
		this.shortDes = shortDes;
		this.active = active;
	}
	
	

}
