package com.my.app.backend.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String email;
    
    @Column(name = "password_hash")
    private String passwordHash;
    
    @Column(length = 100)
    private String name;
    
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;
    
    @Column(name = "phone_verified")
    private Boolean phoneVerified = false;
    
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    
    @Column(name = "invite_code", unique = true)
    private String inviteCode;
    
    @Column(name = "couple_id")
    private Long coupleId;
    
    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;
}