package com.springproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.springproject.domain.Game;
import com.springproject.repo.GameRepo;

@Service
public class GameService implements ServiceIF<Game> {
	
	private GameRepo repo;
	
	@Autowired
	public GameService(GameRepo repo) {
		super();
		this.repo = repo;
	}
	
	// Create Game Listing
	public Game create(Game g) {
		Game created = this.repo.save(g);
		return created;
	}
	
	// Get All Game Listings
	public List<Game> getAll() {
		return this.repo.findAll();
	}
	
	// Get Game By ID
	public Game getById(Integer id) {
		Optional<Game> found = this.repo.findById(id);
		return found.get();
	}
	// Update fields at selected ID
	public Game replace(Integer id, Game newGame) {
		Game existing = this.repo.findById(id).get();
		existing.setName(newGame.getName());
		existing.setGenre(newGame.getGenre());
		existing.setHoursPlayed(newGame.getHoursPlayed());
		Game updated = this.repo.save(existing);
		return updated;
	}
	public void remove(@PathVariable Integer id) {
		this.repo.deleteById(id);
	}
	

}

