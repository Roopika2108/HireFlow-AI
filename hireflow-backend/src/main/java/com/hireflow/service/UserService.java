package com.hireflow.service;

import com.hireflow.dto.LoginRequest;
import com.hireflow.entity.User;

public interface UserService {

	User updateUser(Long id, User user);
	
    User registerUser(User user);

    boolean loginUser(LoginRequest loginRequest);

    User getUserByEmail(String email);

}