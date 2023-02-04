package com.sdlc.restaurant.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.sdlc.restaurant.entity.OrderList;
import com.sdlc.restaurant.entity.Reservation;
import com.sdlc.restaurant.entity.User;
import com.sdlc.restaurant.repository.OrderListRepository;

import com.sdlc.restaurant.repository.ReservationRepository;
import com.sdlc.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderListController {
    @Autowired
    OrderListRepository orderListRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ReservationRepository reservationRepository;

    @PostMapping(value = "/orderlist/add", consumes = "application/json")
    public OrderList add(@RequestBody OrderList order) {
        orderListRepo.save(order);
        return order;
    }

    @GetMapping(value = "/orderlist")
    public List<OrderList> getAll() {
        List<OrderList> order = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findAll();

        for (Reservation res : reservations) {
            if (res.getStatus().equalsIgnoreCase("Check Out") && res.getOrderList() != null) {
                if (res.getOrderList().getCommentTitle() != null && res.getOrderList().getCommentSubTitle() != null) {
                    res.getOrderList().getUser().setName(res.getName());
                    order.add(res.getOrderList());
                }
            }
        }
        return order;
    }

    @GetMapping(value = "/orderlist/get")
    public List<OrderList> getById(@RequestParam String id) {
        Optional<User> user = userRepository.findById(Long.parseLong(id));
        List<Reservation> reservations = reservationRepository.findByUser(user.get());
        List<OrderList> order = new ArrayList<>();
        for (Reservation res : reservations) {
            if (res.getStatus().equalsIgnoreCase("Check Out") && res.getOrderList() != null) {
                res.getOrderList().getUser().setName(res.getName());
                order.add(res.getOrderList());
            }
        }
        return order;
    }

    @PostMapping("/orderlist/update")
    public void setComment(@RequestBody List<OrderList> orderList, @RequestParam int id) {
        for (OrderList orderL : orderList) {
            orderL.setId(id);
            orderListRepo.save(orderL);
        }
    }
}
