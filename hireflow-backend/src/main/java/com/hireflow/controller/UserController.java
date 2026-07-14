package com.hireflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hireflow.dto.LoginRequest;
import com.hireflow.dto.LoginResponse;
import com.hireflow.entity.User;
import com.hireflow.jwt.JwtService;
import com.hireflow.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {

        boolean isLoggedIn = userService.loginUser(loginRequest);

        if (isLoggedIn) {

            User user = userService.getUserByEmail(loginRequest.getEmail());

            String token = jwtService.generateToken(loginRequest.getEmail());

            return ResponseEntity.ok(
                    new LoginResponse(
                            "Login Successful",
                            token,
                            user.getId(),
                            user.getRole()));
        } else {

            return ResponseEntity.badRequest()
                    .body(new LoginResponse("Invalid Email or Password", ""));
        }
    }

    // Get User by Email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // Update User Profile
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
}