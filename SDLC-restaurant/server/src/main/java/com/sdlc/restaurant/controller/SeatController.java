package com.sdlc.restaurant.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sdlc.restaurant.entity.Seat;
import com.sdlc.restaurant.notfoundexception.SeatNotFoundException;
import com.sdlc.restaurant.repository.SeatRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {

	@Autowired
	private SeatRepository seatRepository;

	@GetMapping("/seat")

	public List<Seat> retrieveAllSeat() {
		return seatRepository.findAll();
	}

	@GetMapping("/seat/{id}")

	public Seat retrieveSeat(@PathVariable long id) {
		Optional<Seat> seat = seatRepository.findById(id);

		if (!seat.isPresent())
			throw new SeatNotFoundException("id-" + id);

		return seat.get();
	}

	@DeleteMapping("/seat/{id}")

	public void deleteSeat(@PathVariable long id) {
		seatRepository.deleteById(id);
	}

	@PostMapping("/seat")

	public ResponseEntity<Object> createSeat(@RequestBody Seat seat) {
		Seat savedSeat = seatRepository.save(seat);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedSeat.getId())
				.toUri();

		return ResponseEntity.created(location).build();

	}

	@PutMapping("/seat/{id}")

	public ResponseEntity<Object> updateSeat(@RequestBody Seat seat, @PathVariable long id) {

		Optional<Seat> seatOptional = seatRepository.findById(id);

		if (!seatOptional.isPresent())
			return ResponseEntity.notFound().build();

		seat.setId(id);

		seatRepository.save(seat);

		return ResponseEntity.noContent().build();
	}
}