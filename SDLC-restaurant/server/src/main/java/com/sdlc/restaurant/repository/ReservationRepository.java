package com.sdlc.restaurant.repository;

import com.sdlc.restaurant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdlc.restaurant.entity.Reservation;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	List<Reservation> findAll();

	List<Reservation> findAllByDateAndStatusNot(Date date, String status);

	List<Reservation> findByUser(User user);
}
