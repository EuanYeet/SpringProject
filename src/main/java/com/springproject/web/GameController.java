package com.springproject.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springproject.domain.Game;
import com.springproject.service.GameService;

@RestController
public class GameController {
	
	private GameService service;
	
	@Autowired
	public GameController(GameService service) {
		super();
		this.service = service;
	}
	
	@PostMapping("/create") // 201 - Created
	public ResponseEntity<Game> createGame(@RequestBody Game g) {
		Game created = this.service.create(g);
		ResponseEntity<Game> response = new ResponseEntity<Game>(created,HttpStatus.CREATED);
		return response;
	}
	
	@GetMapping("/getAll") // 200 - OK
	public ResponseEntity<List<Game>> getAllGames() {
		return ResponseEntity.ok(this.service.getAll());
	}
	
	@GetMapping("/getById/{id}") // 200 - OK
	public Game getGame(@PathVariable Integer id) {
		return this.service.getById(id);
	}
	@PutMapping("/replace/{id}") //202 - Accepted
	public ResponseEntity<Game> replaceGame(@PathVariable Integer id, @RequestBody Game newGame) {
		Game body = this.service.replace(id, newGame);
		ResponseEntity<Game> response = new ResponseEntity<Game>(body, HttpStatus.ACCEPTED);
		return response;
	}
	
	@DeleteMapping("/remove/{id}") // 204 - No Content
	public ResponseEntity<?> removeGame(@PathVariable Integer id) {
		this.service.remove(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

