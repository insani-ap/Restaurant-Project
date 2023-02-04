package com.sdlc.restaurant.entity;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.*;

@Entity
public class Reservation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "guestAmount")
	private int guestAmount;

	@Column(name = "date")
	private Date date;

	@Column(name = "time")
	private LocalTime time;

	@Column(name = "status")
	private String status = "Waiting for approvement";

	@Column(name = "timeInterval")
	private String timeInterval;

	@Column(name = "notes", length = 4000, columnDefinition = "TEXT")
	private String notes;

	@ManyToMany(fetch = FetchType.EAGER)
	List<Seat> seat;

	@OneToOne
	OrderList orderList;

	@ManyToOne
	User user;

	public Reservation() {
	}

	public Reservation(Long id, String name, int guestAmount, Date date, LocalTime time, String status,
			String timeInterval, String notes, OrderList orderList, List<Seat> seat, User user) {
		this.id = id;
		this.name = name;
		this.guestAmount = guestAmount;
		this.date = date;
		this.time = time;
		this.status = status;
		this.timeInterval = timeInterval;
		this.orderList = orderList;
		this.notes = notes;
		this.seat = seat;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getGuestAmount() {
		return guestAmount;
	}

	public void setGuestAmount(int guestAmount) {
		this.guestAmount = guestAmount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTimeInterval() {
		return timeInterval;
	}

	public void setTimeInterval(String timeInterval) {
		this.timeInterval = timeInterval;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public List<Seat> getSeat() {
		return seat;
	}

	public void setSeat(List<Seat> seat) {
		this.seat = seat;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public OrderList getOrderList() {
		return orderList;
	}

	public void setOrderList(OrderList orderList) {
		this.orderList = orderList;
	}

}
