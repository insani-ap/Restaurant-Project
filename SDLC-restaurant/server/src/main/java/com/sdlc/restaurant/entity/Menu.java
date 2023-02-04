package com.sdlc.restaurant.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Menu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "price")
	private int price;

	@Column(name = "category")
	private String category;

	@Column(name = "image", length = 1000)
	private String image;

	@Column(name = "valuta")
	private String valuta;

	@Column(name = "description", length = 4000, columnDefinition = "TEXT")
	private String description;

	public Menu() {
	}

	public Menu(Long id, String name, int price, String category, String image, String valuta, String description) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.category = category;
		this.image = image;
		this.valuta = valuta;
		this.description = description;
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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getValuta() {
		return valuta;
	}

	public void setValuta(String valuta) {
		this.valuta = valuta;
	}

}
