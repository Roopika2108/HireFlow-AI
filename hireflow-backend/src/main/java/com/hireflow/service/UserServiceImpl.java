package com.hireflow.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hireflow.dto.LoginRequest;
import com.hireflow.entity.User;
import com.hireflow.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public boolean loginUser(LoginRequest loginRequest) {

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        String enteredPassword = loginRequest.getPassword();
        String dbPassword = user.getPassword();

        boolean matched = false;

        if (dbPassword.startsWith("$2a$") || dbPassword.startsWith("$2b$") || dbPassword.startsWith("$2y$")) {

            matched = passwordEncoder.matches(enteredPassword, dbPassword);

        } else {

            matched = enteredPassword.equals(dbPassword);

            if (matched) {
                user.setPassword(passwordEncoder.encode(enteredPassword));
                userRepository.save(user);
            }
        }

        return matched;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {
            existingUser.setFullName(user.getFullName());
            existingUser.setPhone(user.getPhone());
            return userRepository.save(existingUser);
        }

        return null;
    }
}