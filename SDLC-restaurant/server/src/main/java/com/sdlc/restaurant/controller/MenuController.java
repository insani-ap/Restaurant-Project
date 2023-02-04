package com.sdlc.restaurant.controller;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sdlc.restaurant.entity.Menu;
import com.sdlc.restaurant.notfoundexception.MenuNotFoundException;
import com.sdlc.restaurant.repository.MenuRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

	@Autowired
	private MenuRepository menuRepository;

	@GetMapping("/menu")

	public List<Menu> retrieveAllMenu() {
		return menuRepository.findAll();
	}

	@GetMapping("/menu/{id}")

	public Menu retrieveMenu(@PathVariable long id) {
		Optional<Menu> menu = menuRepository.findById(id);

		if (!menu.isPresent())
			throw new MenuNotFoundException("id-" + id);

		return menu.get();
	}

	@DeleteMapping("/menu/{id}")

	public void deleteMenu(@PathVariable long id) {
		menuRepository.deleteById(id);
	}

	@PostMapping(value = "/menu")
	public String createMenu(@RequestPart("imgMenu") MultipartFile menuFile, @RequestPart("menu") Menu menu) {
		try {
			String randomName = "IMG_" + (int) (Math.random() * 99999) + 1;
			String extension = menuFile.getOriginalFilename().split("\\.")[1];
			String pathFile = this.getClass().getResource("/public/img/").getPath() + randomName + "." + extension;
			File files = new File(pathFile.replace("%20", " "));
			menuFile.transferTo(files);
			menu.setImage("http://localhost:8080/img/" + randomName + "." + extension);
			menuRepository.save(menu);
			return "Data Saved";
		} catch (Exception e) {
			System.out.println(e);
			return "Data Not Saved";
		}
	}

	@PutMapping(value = "/menu/{id}")
	public String updateMenu(@RequestPart("imgMenu") MultipartFile menuFile, @RequestPart("menu") Menu menu,
			@PathVariable long id) {
		try {
			String pathFile = this.getClass().getResource("/public/img/").getPath();
			Optional<Menu> menuUpdate = menuRepository.findById(id);
			String imgOld = menuUpdate.get().getImage();
			imgOld.replace("http://localhost:8080/img/", "");
			File fileOld = new File(pathFile.replace("%20", " ") + imgOld);
			fileOld.delete();

			String randomName = "IMG_" + (int) (Math.random() * 99999) + 1;
			String extension = menuFile.getOriginalFilename().split("\\.")[1];
			File newFile = new File(pathFile.replace("%20", " ") + randomName + "." + extension);
			menuFile.transferTo(newFile);
			menu.setImage("http://localhost:8080/img/" + randomName + "." + extension);

			menu.setId(id);
			menuRepository.save(menu);
			return "Data Saved";
		} catch (Exception e) {
			System.out.println(e);
			return "Data Not Saved";
		}
	}

	@PutMapping(value = "/menunofile/{id}")
	public String updateMenuNoFile(@RequestBody Menu menu, @PathVariable long id) {
		try {
			Optional<Menu> menuUpdate = menuRepository.findById(id);
			menu.setId(id);
			menu.setImage(menuUpdate.get().getImage());
			menuRepository.save(menu);
			return "Data Saved";
		} catch (Exception e) {
			System.out.println(e);
			return "Data Not Saved";
		}
	}
}