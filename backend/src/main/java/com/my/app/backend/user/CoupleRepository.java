package com.my.app.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoupleRepository extends JpaRepository<Couple, Long> {
    Optional<Couple> findByUser1Id(Long user1Id);
    Optional<Couple> findByUser2Id(Long user2Id);
    Optional<Couple> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);
    Optional<Couple> findByUser1IdAndStatus(Long user1Id, Couple.CoupleStatus status);
}

