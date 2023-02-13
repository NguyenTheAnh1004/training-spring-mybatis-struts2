package com.training.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "users")
public class User extends Abtract{
	
	@Column(name = "createAt")
	private Date createdAt = new Date();
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "login_date")
	@JsonFormat(timezone = "Asia/Ho_Chi_Minh")
	private Date loginDate;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "last_iplogin")
	private String lastIpLogin;
	
	@Column(name = "remember_token")
	private String rememberToken;
	
	@Column(name = "group_role")
	private String groupRole;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getLoginDate() {
		return loginDate;
	}
	public void setLoginDate(Date loginDate) {
		this.loginDate = loginDate;
	}
	public String getLastIpLogin() {
		return lastIpLogin;
	}
	public void setLastIpLogin(String lastIpLogin) {
		this.lastIpLogin = lastIpLogin;
	}
	public String getRememberToken() {
		return rememberToken;
	}
	public void setRememberToken(String rememberToken) {
		this.rememberToken = rememberToken;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroupRole() {
		return groupRole;
	}
	public void setGroupRole(String groupRole) {
		this.groupRole = groupRole;
	}
	
	
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public User(Long id, String email, String name, String groupRole, Boolean stt) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.groupRole = groupRole;
		this.status = stt;
	}
	
	public User(String email, String name, String groupRole, Boolean stt) {
		super();
		this.email = email;
		this.name = name;
		this.groupRole = groupRole;
		this.status = stt;
	}
	
	public User(String email, String password, String name, String groupRole, Boolean status) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.groupRole = groupRole;
		this.status = status;
	}
	public User() {
		super();

	}
	
	
	
	
}
