package com.training.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;
import com.training.mapper.UsersMapper;
import com.training.model.User;

//import com.training.repository.usersMapper;

@Controller
public class UserAction extends ActionSupport
		implements SessionAware, ParameterNameAware, ServletResponseAware, ServletRequestAware {

	public static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private static final long serialVersionUID = 1L;

//	@Autowired
//	private usersMapper usersMapper;
	
	@Autowired
	private UsersMapper usersMapper;

	protected HttpServletRequest servletRequest;
	protected HttpServletResponse servletResponse;
	private Map<String, Object> userSession;

	public String REMEMBER_TOKEN = "remember_token";
	public static final String USER = "USER";
	public static final Integer tokenExpiredTime = 3600;

	private User userBean;
	private boolean remember;

	private List<User> users;

	private int page = 1;
	private int size = 5;

	private Long id;
	private String name;
	private String email;
	private String role;
	private String password;

//	public String name, email, role, password;
	private Boolean status;
	
	private Integer totalUsers;

	
	//login
	public String login() throws UnknownHostException {
		System.out.println(name);
		InetAddress IP = InetAddress.getLocalHost();
		String token = UUID.randomUUID().toString();
		
		if (userBean == null) {
			if (getRememberToken() != null && usersMapper.getRememberToken(getRememberToken()) > 0) {
				return SUCCESS;
			}
			if (userSession.get(REMEMBER_TOKEN) != null) {
				return SUCCESS;
			}
				
			return INPUT;
		} else if (userBean.getEmail().length() > 0 && userBean.getPassword().length() > 0) {
			User user = new User();
			user = usersMapper.getUserByMail(userBean.getEmail());
			if (user.getStatus() == true) {
				userSession.put(REMEMBER_TOKEN, token);
				userSession.put(USER, user.getEmail());
				user.setLoginDate(new Date());
				user.setLastIpLogin(IP.getHostAddress());
				user.setRememberToken(token);
				usersMapper.updateLogin(user);
				if (isRemember()) {
					user.setRememberToken(token);
					usersMapper.updateRmbToken(user);
					Cookie cookie = new Cookie(REMEMBER_TOKEN, token);
					cookie.setMaxAge(tokenExpiredTime);
					Cookie cookieName = new Cookie(USER, user.getEmail());
					cookieName.setMaxAge(tokenExpiredTime);
					servletResponse.addCookie(cookie);
					servletResponse.addCookie(cookieName);
				}
				return SUCCESS;
			} else {
				System.out.println("sai roi nhee");
				return INPUT;
			}

		}
		return INPUT;
	}

	//logout
	public String logout() {
		userSession.remove(REMEMBER_TOKEN);
		if (servletRequest.getCookies() != null)
			for (Cookie c : servletRequest.getCookies()) {
				c.setValue("");
				c.setPath("/");
				c.setMaxAge(0);
				servletResponse.addCookie(c);
			}
		return SUCCESS;
	}

	
//manage
	public String manage() {
		System.out.println(userSession.get(REMEMBER_TOKEN));
		if (getRememberToken() == null && userSession.get(REMEMBER_TOKEN) == null) {
			return "login";
		}
		if (getRememberToken() != null && usersMapper.getRememberToken(getRememberToken()) > 0) {
			User user1 = usersMapper.getMailByToken(getRememberToken());
			userSession.put(USER, user1.getEmail());
		}
		System.out.println(page);
		System.out.println("status is "+ status);
		System.out.println(userSession.get(REMEMBER_TOKEN));
		this.users = usersMapper.getUserAllWPage((page-1)*size, size);
		return SUCCESS;
	}

	public String search() {
		if (getRememberToken() == null && userSession.get(REMEMBER_TOKEN) == null) {
			return "login";
		}
		if (getRememberToken() != null && usersMapper.getRememberToken(getRememberToken()) > 0) {
			User user1 = usersMapper.getMailByToken(getRememberToken());
			userSession.put(USER, user1.getEmail());
		}
		System.out.println(email);
		System.out.println(name);
		System.out.println(status);
		System.out.println(role);
		User user = new User(email, name, role, status);
		this.users = usersMapper.findUserByOption((page-1)*size, size,user);
		return SUCCESS;
	}
	
	public String testmb() {
		this.users = usersMapper.getAllUsers();
		return SUCCESS;
	}
	
	public String findAllUser() {
		
		System.out.println(userSession.get(REMEMBER_TOKEN));
		if (getRememberToken() == null && userSession.get(REMEMBER_TOKEN) == null) {
			return "login";
		}
		if (getRememberToken() != null && usersMapper.getRememberToken(getRememberToken()) > 0) {
			User user1 = usersMapper.getMailByToken(getRememberToken());
			userSession.put(USER, user1.getEmail());
		}
		this.users = usersMapper.getUserAll();
		this.totalUsers = usersMapper.countAllUser();
		return SUCCESS;
	}
	
	public String findAllSearch() {	
		System.out.println(userSession.get(REMEMBER_TOKEN));
		if (getRememberToken() == null && userSession.get(REMEMBER_TOKEN) == null) {
			return "login";
		}
		if (getRememberToken() != null && usersMapper.getRememberToken(getRememberToken()) > 0) {
			User user1 = usersMapper.getMailByToken(getRememberToken());
			userSession.put(USER, user1.getEmail());
		}
		System.out.println(email);
		System.out.println(name);
		System.out.println(status);
		System.out.println(role);
		User user = new User(email, name, role, status);
		this.users = usersMapper.findAllUserBySearch(user);
		this.totalUsers = usersMapper.countAllUserBySearch(user);
		return SUCCESS;
	}
	
	public String listByPage() {
		System.out.println(page);
		System.out.println(size);
		this.users = usersMapper.getUserAllWPage((page-1)*size, size);
		System.out.println(this.users);
		return SUCCESS;
	}
	
	public String getByMail() {
		try {
			this.userBean = usersMapper.getUserByMail(email);
			System.out.println("USER " + userBean);
		} catch (Exception e) {
			System.out.println(e);
		}
		return SUCCESS;
	}

	public String changeStt() {
		System.out.println(id);
		System.out.println(status);
		usersMapper.changestt(id, !status);
		return SUCCESS;
	}

	public void validate() {
//		
		try {
			User user = new User();
			if (userBean.getEmail().length() > 0 && userBean.getPassword().length() > 0) {
				user = usersMapper.getUserByMail(userBean.getEmail());
				System.out.println(userBean.getPassword() + passwordEncoder.encode(userBean.getPassword()));
			}

			if (userBean.getEmail().length() <= 0) {
				addFieldError("email", "Email ch??a ???????c nh??pk.");

			}

			else if (userBean.getPassword().length() <= 0) {
				addFieldError("password", "PasssWord ch??a ???????c nh???p.");
			}

			else if (user == null) {
				addFieldError("failed", "PasssWord hoac email sai!.");

			} else if (!(passwordEncoder.matches(userBean.getPassword(), user.getPassword()))) {
				addFieldError("failed", "PasssWord hoac email sai!.");
			} else if (user.getStatus() == false) {
				addFieldError("failed", "t??i kho???n c???a b???n ???? b??? kh??a :)");
			}

		} catch (Exception e) {
			System.out.println("loi roi ne");
		}

	}

//  insert user
	public String insert() {
		User user = new User(email, passwordEncoder.encode(password), name, role, status);
		user.setCreatedAt(new Date());
		System.out.println(user.getEmail());
		usersMapper.insertUser(user);
		return SUCCESS;
	}

	public String update() {
		User user = new User(id, email, name, role, status);
		System.out.println(user.getEmail());
		usersMapper.updateUser(user);
		return SUCCESS;
	}

	public String delete() {
		System.out.println(id);
		usersMapper.updatedelete(id);
		return SUCCESS;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUserBean() {
		return userBean;
	}

	public void setUserBean(User userBean) {
		this.userBean = userBean;
	}

	public boolean isRemember() {
		return remember;
	}

	public void setRemember(boolean remember) {
		this.remember = remember;
	}

	public List<User> getUsers() {
 		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

//	// current cookie
//
//
//
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public Integer getTotalUsers() {
		return totalUsers;
	}

	public void setTotalUsers(Integer totalUsers) {
		this.totalUsers = totalUsers;
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
