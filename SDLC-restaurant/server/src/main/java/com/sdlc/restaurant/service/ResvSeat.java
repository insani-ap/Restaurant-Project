package com.sdlc.restaurant.service;

public class ResvSeat {
    private Long id;
    private String name;
    private int capacity;
    private String status;
    private String classSeat;

    public ResvSeat() {}

    public ResvSeat(Long id, String name, int capacity, String status, String classSeat) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.status = status;
        this.classSeat = classSeat;
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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClassSeat() {
        return classSeat;
    }

    public void setClassSeat(String classSeat) {
        this.classSeat = classSeat;
    }
}