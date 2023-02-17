package com.training.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.training.model.User;

@Mapper
public interface UsersMapper {

//	@Select("SELECT * FROM users where is_delete = 0 and users.email = #{email} and users.password = #{password}")
	User getUserByMailPass(@Param("email") String email, @Param("password") String password);

//	@Select("SELECT * FROM users where is_delete = 0  ORDER BY create_at DESC")
	List<User> getUserAll();

//	@Select("SELECT * FROM users where is_delete = 0  ORDER BY create_at DESC Limit #{page},#{size} ")
	List<User> getUserAllWPage(@Param("page") Integer page, @Param("size") Integer size);

//	@Select("SELECT COUNT(*) FROM users WHERE users.remember_token = #{rememberToken}")
	Integer getRememberToken(@Param("rememberToken") String rememberToken);

//	@Select("SELECT email FROM users WHERE users.remember_token = #{rememberToken}")
	User getMailByToken(@Param("rememberToken") String rememberToken);

//	@Update("UPDATE users SET  users.login_date = #{user.loginDate}, users.last_iplogin = #{user.lastIpLogin} WHERE users.email = #{user.email}")
	public void updateLogin(@Param("user") User user);

//	@Update("UPDATE users SET users.remember_token = #{user.rememberToken} WHERE users.email = #{user.email}")
	public void updateRmbToken(@Param("user") User user);

//	@Update("UPDATE users SET users.name = #{user.name}, users.email = #{user.email}, users.group_role = #{user.groupRole}, users.status = #{user.status}  WHERE users.id = #{user.id}")
	public void updateUser(@Param("user") User user);

//	@Insert("INSERT INTO users (status, email, password, name, group_role, is_delete, create_at) VALUES (#{user.status}, #{user.email}, #{user.password}, #{user.name}, #{user.groupRole}, false, #{user.createdAt});")
	public void insertUser(@Param("user") User user);

//	@Select("SELECT * FROM users where users.email = #{email}")
	User getUserByMail(@Param("email") String email);

//	@Update("UPDATE users SET  users.is_delete = true WHERE users.id = #{id}")
	public void updatedelete(@Param("id") Long id);

//	@Update("UPDATE users SET  users.status = #{stt} WHERE users.id = #{id}")
	public void changestt(@Param("id") Long id, @Param("stt") Boolean stt);

//	@Select("SELECT id, name, email, group_role, status FROM users WHERE is_delete = 0 and users.email like CONCAT('%', #{user.email}, '%') And users.name like CONCAT('%', #{user.name}, '%') And users.group_role like CONCAT('%', #{user.groupRole}, '%') And users.status = #{user.status} Limit #{page},#{size}")
	public List<User> findUserByOption(@Param("page") Integer page, @Param("size") Integer size,
			@Param("user") User user);

//	@Select("SELECT id, name, email, group_role, status FROM users WHERE is_delete = 0 and users.email like CONCAT('%', #{user.email}, '%') And users.name like CONCAT('%', #{user.name}, '%') And users.group_role like CONCAT('%', #{user.groupRole}, '%') And users.status = #{user.status} ")
	public List<User> findAllUserBySearch(@Param("user") User user);

	public List<User> getAllUsers();
	
	public Integer countAllUser();
	
	public Integer countAllUserBySearch(@Param("user") User user);
}