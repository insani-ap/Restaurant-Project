package com.sdlc.restaurant.controller;

import com.sdlc.restaurant.entity.Menu;
import com.sdlc.restaurant.entity.Reservation;
import com.sdlc.restaurant.entity.Seat;
import com.sdlc.restaurant.entity.User;
import com.sdlc.restaurant.repository.UserRepository;
import com.sdlc.restaurant.service.MailServ;
import com.sdlc.restaurant.service.ResvSeat;
import com.sdlc.restaurant.repository.ReservationRepository;
import com.sdlc.restaurant.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class GeneralController {
	private ReservationRepository reservationRepository;
	private SeatRepository seatRepository;
	private UserRepository userRepository;
	private MailServ mail;

	@Autowired
	public GeneralController(ReservationRepository reservationRepository, SeatRepository seatRepository,
			UserRepository userRepository, MailServ mail) {
		this.reservationRepository = reservationRepository;
		this.seatRepository = seatRepository;
		this.userRepository = userRepository;
		this.mail = mail;
	}

	@PostMapping("/resvpublic")
	public Reservation getResvPublic(@RequestBody Reservation reservation) {
		reservationRepository.save(reservation);
		User user = userRepository.findByIdAndName(reservation.getUser().getId(), reservation.getUser().getName());
		
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
		String str = sb.toString();
		
		double resvCharge = reservation.getGuestAmount() * 5.0;
		double fullBookCharge = 0.0;
		if (reservation.getTimeInterval().matches("Full Day Book")) {
			fullBookCharge = 30.0 + reservation.getGuestAmount() * 5.0;
		}
		String email = user.getEmail();
		String title = "[NEXSOFT] Reservation at Nexsoft Restaurant - Reservation ID " + reservation.getId();
		String msgResvOnly = "--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
				+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName() + "\nParty Size : "
				+ reservation.getGuestAmount() + "\nDate : " + reservation.getDate() + "\nTime : "
				+ reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval()
				+ "\n--------------------------------------------------------------------\nSeat : " + str
				+ "\n--------------------------------------------------------------------\nReservation Charge : $"
				+ (double)resvCharge + "\nFull Day Book Charge : $" + (double)fullBookCharge+"\nTax : $" + (double)(fullBookCharge + resvCharge)*10.0/100.0
				+ "\n--------------------------------------------------------------------\nTotal to Pay : $"
				+ (double)(fullBookCharge + resvCharge)*110.0/100.0 + "\nPayment Status : Unpaid" + "\nReservation Status : "
				+ reservation.getStatus()
				+ "\n--------------------------------------------------------------------\n\nThankyou " + user.getName()
				+ " for reserving our table, you will get reservation confirmation within 2 hours. Please contact our customer services for further information.";

		if (reservation.getOrderList() == null) {
			mail.sendMessage(email, title, msgResvOnly);
		}
		if (reservation.getOrderList() != null) {
			HashMap<String, Integer> menu = new HashMap<String, Integer>();
			for (Menu olMenu : reservation.getOrderList().getMenu()) {
				menu.put(olMenu.getName(), olMenu.getPrice());
			}
			double total = 0.0;
			for (int priceEach : menu.values()) {
				total = total + priceEach;
			}
			String orderedMenu = "";
			for (HashMap.Entry<String, Integer> set : menu.entrySet()) {
				orderedMenu = orderedMenu + set.getKey() + " : " + set.getValue() + "\n";
			}
			String msgWMeal = "--------------------------------------------------------------------\nRESERVATION INVOICE\n--------------------------------------------------------------------"
					+ "\nReservation ID : " + reservation.getId() + "\nName : " + reservation.getName()
					+ "\nParty Size : " + reservation.getGuestAmount() + "\nDate : " + reservation.getDate()
					+ "\nTime : " + reservation.getTime() + "\nTime Interval : " + reservation.getTimeInterval()
					+ "\n--------------------------------------------------------------------" + "\nSeat : " + str
					+ "\n--------------------------------------------------------------------" + "\nOrder List : \n"
					+ orderedMenu + "--------------------------------------------------------------------"
					+ "\nTotal Order : $" + total + "\nFull Day Book Charge : $" + (double)fullBookCharge + "\nTax (10%) : $"
					+ (double)(fullBookCharge + total) * 10.0 / 100.0
					+ "\n--------------------------------------------------------------------" + "\nTotal to pay : $"
					+ (double)(fullBookCharge + total) * 110 / 100 + "\nPayment Status : Unpaid" + "\nReservation Status : "
					+ reservation.getStatus()
					+ "\n--------------------------------------------------------------------\n\nThankyou "
					+ user.getName()
					+ " for reserving our table, you will get reservation confirmation within 2 hours. Please contact our customer services for further information.";
			mail.sendMessage(email, title, msgWMeal);
		}
		return reservation;
	}

	@GetMapping("/seatresv")
	public List<ResvSeat> getResvSeat(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
		List<Reservation> reservations = reservationRepository.findAllByDateAndStatusNot(date, "Check Out");
		List<Seat> seat = seatRepository.findAllByStatus("Active");
		List<ResvSeat> resvSeats = new ArrayList<>();
		int i = 0;
		for (Seat sea : seat) {
			resvSeats.add(i, new ResvSeat(sea.getId(), sea.getName(), sea.getCapacity(), sea.getStatus(), "TableFree"));
			i++;
		}

		for (Reservation res : reservations) {
			if (!res.getStatus().equalsIgnoreCase("Declined")) {
				for (Seat sea : res.getSeat()) {
					if (res.getTimeInterval().equalsIgnoreCase("Regular")) {
						resvSeats.set((int) (sea.getId() - 1),
								new ResvSeat(sea.getId(), sea.getName(), sea.getCapacity(), sea.getStatus(), "TablePart"));
					} else {
						resvSeats.set((int) (sea.getId() - 1),
								new ResvSeat(sea.getId(), sea.getName(), sea.getCapacity(), sea.getStatus(), "TableFull"));
					}
				}
			}
		}
		return resvSeats;
	}
}
