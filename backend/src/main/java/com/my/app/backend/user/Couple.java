package com.my.app.backend.user;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "couples")
@Data
public class Couple {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user1_id")
    private Long user1Id;
    
    @Column(name = "user2_id")
    private Long user2Id;
    
    @Column(name = "nickname_for_user1", length = 50)
    private String nicknameForUser1;
    
    @Column(name = "nickname_for_user2", length = 50)
    private String nicknameForUser2;
    
    @Enumerated(EnumType.STRING)
    private CoupleStatus status = CoupleStatus.WAITING;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public enum CoupleStatus {
        WAITING,
        CONNECTED,
        BLOCKED
    }
}

