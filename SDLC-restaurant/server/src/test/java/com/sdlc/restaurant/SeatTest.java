package com.sdlc.restaurant;

import com.sdlc.restaurant.controller.SeatController;
import com.sdlc.restaurant.entity.Seat;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SeatTest {
    @Autowired
    SeatController seatCont;

    Seat seat = new Seat();

    @Test
    void retrieveAllSeat() {
        Assert.assertTrue(seatCont.retrieveAllSeat().size() != 0);
    }
}
