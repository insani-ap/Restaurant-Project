package com.sdlc.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdlc.restaurant.entity.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long>{
}

