package com.example.employee.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    /** Auto-seed default users on first startup */
    @EventListener(ApplicationReadyEvent.class)
    public void seedUsers() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            userRepository.save(new User("admin",      "admin123", "admin"));
        }
        if (userRepository.findByUsername("john.doe").isEmpty()) {
            userRepository.save(new User("john.doe",   "emp123",   "employee"));
        }
        if (userRepository.findByUsername("jane.smith").isEmpty()) {
            userRepository.save(new User("jane.smith", "emp123",   "employee"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var found = userRepository.findByUsername(req.getUsername());

        if (found.isEmpty())
            return ResponseEntity.status(401).body("User not found");

        User user = found.get();

        if (!user.getPassword().equals(req.getPassword()))
            return ResponseEntity.status(401).body("Invalid password");

        if (!user.getRole().equalsIgnoreCase(req.getRole()))
            return ResponseEntity.status(403).body("You are not a " + req.getRole());

        String token = UUID.randomUUID().toString();

        return ResponseEntity.ok(Map.of(
            "token",    token,
            "role",     user.getRole(),
            "username", user.getUsername()
        ));
    }
}
