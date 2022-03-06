package com.springproject.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springproject.domain.Game;

@Repository
public interface GameRepo extends JpaRepository<Game, Integer>{

	List<Game> findByNameIgnoreCase(String name);
	
	List<Game> findByGenreIgnoreCase(String genre);
}
