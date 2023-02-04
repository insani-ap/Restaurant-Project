package com.sdlc.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdlc.restaurant.entity.Seat;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long>{
    List<Seat> findAllByStatus(String status);
}