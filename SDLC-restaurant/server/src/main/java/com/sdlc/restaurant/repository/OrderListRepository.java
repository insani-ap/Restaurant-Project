package com.sdlc.restaurant.repository;

import com.sdlc.restaurant.entity.OrderList;

import com.sdlc.restaurant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderListRepository extends JpaRepository<OrderList, Integer> {
    List<OrderList> findAllByUser(User user);
}
