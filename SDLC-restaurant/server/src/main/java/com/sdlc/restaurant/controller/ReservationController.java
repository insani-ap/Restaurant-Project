package com.sdlc.restaurant.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
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

import com.sdlc.restaurant.entity.Menu;
import com.sdlc.restaurant.entity.Reservation;
import com.sdlc.restaurant.entity.Seat;
import com.sdlc.restaurant.entity.User;
import com.sdlc.restaurant.notfoundexception.ReservationNotFoundException;
import com.sdlc.restaurant.repository.ReservationRepository;
import com.sdlc.restaurant.repository.SeatRepository;
import com.sdlc.restaurant.repository.UserRepository;
import com.sdlc.restaurant.service.MailServ;

@RestController
@CrossOrigin(origins = "*")
public class ReservationController {

	private ReservationRepository reservationRepository;
	private SeatRepository seatRepository;
	private MailServ mail;
	private UserRepository userRepository;

	@Autowired
	public ReservationController(ReservationRepository reservationRepository, SeatRepository seatRepository,
			UserRepository userRepository, MailServ mail) {
		this.reservationRepository = reservationRepository;
		this.seatRepository = seatRepository;
		this.userRepository = userRepository;
		this.mail = mail;
	}

	@GetMapping("/reservation")
	public List<Reservation> retrieveAllReservation() {
		return reservationRepository.findAll();
	}

	@GetMapping("/reservation/{id}")

	public Reservation retrieveReservation(@PathVariable long id) {
		Optional<Reservation> reservation = reservationRepository.findById(id);

		if (!reservation.isPresent())
			throw new ReservationNotFoundException("id-" + id);

		return reservation.get();
	}

	@DeleteMapping("/reservation/{id}")

	public void deleteReservation(@PathVariable long id) {
		reservationRepository.deleteById(id);
	}

	@PostMapping("/reservation")

	public ResponseEntity<Object> createReservation(@RequestBody Reservation reservation) {
		Reservation savedReservation = reservationRepository.save(reservation);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedReservation.getId()).toUri();
		return ResponseEntity.created(location).build();

	}

	@PutMapping("/reservation/{id}")

	public ResponseEntity<Object> updateReservation(@RequestBody Reservation reservation, @PathVariable long id) {

		Optional<Reservation> reservationOptional = reservationRepository.findById(id);

		if (!reservationOptional.isPresent())
			return ResponseEntity.notFound().build();

		reservation.setId(id);
		reservationRepository.save(reservation);
		// seat
		ArrayList<String> seatName = new ArrayList<String>();
		for (Seat s : reservation.getSeat()) {
			Optional<Seat> se = seatRepository.findById(s.getId());
			seatName.add(se.get().getName());
		}

		StringBuffer sb = new StringBuffer();
		for (String s : seatName) {
			sb.append("\n");
			sb.append(s);
		}
		double resvCharge = reservation.getGuestAmount() * 5.0;
		double fullBookCharge = 0.0;
		if (reservation.getTimeInterval().matches("Full Day Book")) {
			fullBookCharge = 30.0 + reservation.getGuestAmount() * 5.0;
		}
		String str = sb.toString();
		String email = reservation.getUser().getEmail();
		String title = "[NEXSOFT] Reservation at Nexsoft Restaurant - Reservation ID " + reservation.getId();
		String msgResvOnlyApproved = "Your reservation has been successfully approved.\n--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
				+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName() + "\nParty Size : "
				+ reservation.getGuestAmount() + "\nDate : " + reservation.getDate() + "\nTime : "
				+ reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval()
				+ "\n--------------------------------------------------------------------\nSeat : " + str
				+ "\n--------------------------------------------------------------------\nReservation Charge : $"
				+ (double) resvCharge + "\nFull Day Book Charge : $" + (double) fullBookCharge + "\nTax : $"
				+ (double) (fullBookCharge + resvCharge) * 10.0 / 100.0
				+ "\n--------------------------------------------------------------------\nTotal to Pay : $"
				+ (double) (fullBookCharge + resvCharge) * 110.0 / 100.0 + "\nPayment Status : Unpaid"
				+ "\nReservation Status : " + reservation.getStatus() + "\nNotes : " + reservation.getNotes()
				+ "\n--------------------------------------------------------------------\n\nThankyou "
				+ reservation.getUser().getName()
				+ " for reserving our table. Please complete your payment within 24h.\nPlease transfer to :\n"
				+ "Account Number (BCA) : 900" + reservation.getUser().getPhoneNumber() + reservation.getId()
				+ "\nAccount Holder Name : PT.Paramadaksa Nusantara\n" + "Total Amount : "
				+ (double) (fullBookCharge + resvCharge) * 110.0 / 100.0
				+ "\n\n If you have completed the payment, please send your transaction receipt by replying this email. Once your payment is confirmed, we will send your e-ticket to your email.";

		String msgResvOnlyPaid = "Your reservation payment has been successfully confirmed. Please find your e-ticket and receipt attached :\n--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
				+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName() + "\nParty Size : "
				+ reservation.getGuestAmount() + "\nDate : " + reservation.getDate() + "\nTime : "
				+ reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval()
				+ "\n--------------------------------------------------------------------\nSeat : " + str
				+ "\n--------------------------------------------------------------------\nReservation Charge : $"
				+ (double) resvCharge + "\nFull Day Book Charge : $" + (double) fullBookCharge + "\nTax : $"
				+ (double) (fullBookCharge + resvCharge) * 10.0 / 100.0
				+ "\n--------------------------------------------------------------------\nTotal to Pay : $"
				+ (double) (fullBookCharge + resvCharge) * 110.0 / 100.0 + "\nReservation Status : "
				+ reservation.getStatus() + "\nNotes : " + reservation.getNotes()
				+ "\n--------------------------------------------------------------------\n\nPlease show this e-ticket for check-in to the restaurant.";

		String msgDeclined = "We're really sorry. Your reservation request in the following details :\n--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
				+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName() + "\nParty Size : "
				+ reservation.getGuestAmount() + "\nDate : " + reservation.getDate() + "\nTime : "
				+ reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval() + "\nSeat : " + str
				+ "\nReservation Status : " + reservation.getStatus() + "\nNotes : " + reservation.getNotes()
				+ "\n--------------------------------------------------------------------\n has been declined due to limited seat. Please contact customer service for further information.";
		String msgCheckout = "Dear " + reservation.getUser().getName()
				+ ", thank you for visiting Nexsoft Restaurant. We hope you had a good time. It was a pleasure having you and serving you in our restaurant.";
		// Condition
		if (reservation.getOrderList() == null) {
			if (reservation.getStatus().matches("Approved")) {
				mail.sendMessage(email, title, msgResvOnlyApproved);
			}
			if (reservation.getStatus().matches("Paid")) {
				mail.sendMessage(email, title, msgResvOnlyPaid);
			}
			if (reservation.getStatus().matches("Declined")) {
				mail.sendMessage(email, title, msgDeclined);
			}
			if (reservation.getStatus().matches("Check Out")) {
				mail.sendMessage(email, title, msgCheckout);
			}
		}
		if (reservation.getOrderList() != null) {
			HashMap<String, Integer> menu = new HashMap<String, Integer>();
			for (Menu olMenu : reservation.getOrderList().getMenu()) {
				menu.put(olMenu.getName(), olMenu.getPrice());
			}
			double total = 0.0;
			for (double priceEach : menu.values()) {
				total = total + priceEach;
			}
			String orderedMenu = "";
			for (HashMap.Entry<String, Integer> set : menu.entrySet()) {
				orderedMenu = orderedMenu + set.getKey() + " : $" + set.getValue() + "\n";
			}
			String msgWMealApproved = "Your reservation has been successfully approved. \n--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
					+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName()
					+ "\nParty Size : " + reservation.getGuestAmount() + "\nDate : " + reservation.getDate()
					+ "\nTime : " + reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval()
					+ "\n--------------------------------------------------------------------\nSeat : " + str
					+ "\n--------------------------------------------------------------------\nOrder List : \n"
					+ orderedMenu + "--------------------------------------------------------------------"
					+ "\nTotal Order : $" + total + "\nFull Day Book Charge : $" + (double) fullBookCharge
					+ "\nTax (10%) : $" + (double) (fullBookCharge + total) * 10.0 / 100.0
					+ "\n--------------------------------------------------------------------\nTotal to pay : $"
					+ (double) (fullBookCharge + total) * 110.0 / 100.0
					+ "\nPayment Status : Unpaid\nReservation Status : " + reservation.getStatus() + "\nNotes : "
					+ reservation.getNotes()
					+ "\n--------------------------------------------------------------------\n\nThankyou "
					+ reservation.getUser().getName()
					+ " for reserving our table. Please complete your payment within 24h.\nPlease transfer to :\n"
					+ "Account Number (BCA) : 900" + reservation.getUser().getPhoneNumber()
					+ reservation.getId() + "\nAccount Holder Name : PT.Paramadaksa Nusantara\n" + "Total Amount : $"
					+ (double) (fullBookCharge + total) * 110.0 / 100.0
					+ "\n\n If you have completed the payment, please send your transaction receipt by replying this email. Once your payment is confirmed, we will send your e-ticket to your email.";

			String msgWMealPaid = "Your reservation payment has been successfully confirmed. Please find your e-ticket and receipt attached :\n--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
					+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName()
					+ "\nParty Size : " + reservation.getGuestAmount() + "\nDate : " + reservation.getDate()
					+ "\nTime : " + reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval()
					+ "\n--------------------------------------------------------------------" + "\nSeat : " + str
					+ "\n--------------------------------------------------------------------" + "\nOrder List : \n"
					+ orderedMenu + "--------------------------------------------------------------------"
					+ "\nTotal Order : $" + total + "\nFull Day Book Charge : $" + (double) fullBookCharge
					+ "\nTax (10%) : $" + (double) (fullBookCharge + total) * 10.0 / 100.0
					+ "\n--------------------------------------------------------------------" + "\nTotal to pay : $"
					+ (double) (fullBookCharge + total) * 110.0 / 100.0 + "\nReservation Status : "
					+ reservation.getStatus() + "\nNotes : " + reservation.getNotes()
					+ "\n--------------------------------------------------------------------\n\nPlease show this e-ticket for check-in to the restaurant.";

			if (reservation.getStatus().matches("Approved")) {
				mail.sendMessage(email, title, msgWMealApproved);
			}
			if (reservation.getStatus().matches("Paid")) {
				mail.sendMessage(email, title, msgWMealPaid);
			}
			if (reservation.getStatus().matches("Declined")) {
				mail.sendMessage(email, title, msgDeclined);
			}
			if (reservation.getStatus().matches("Check Out")) {
				mail.sendMessage(email, title, msgCheckout);
			}
		}

		return ResponseEntity.noContent().build();
	}

	@GetMapping(value = "/reservation/user/{id}")
	public List<Reservation> getUserReservation(@PathVariable String id) {
		Optional<User> user = userRepository.findById(Long.parseLong(id));
		return reservationRepository.findByUser(user.get());
	}

}