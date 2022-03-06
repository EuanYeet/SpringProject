package com.springproject.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String genre;
	@Column(nullable = false)
	private Integer hoursPlayed;
	
	public Game() {
		super();
	}
	
	public Game(Integer id, String name, String genre, Integer hoursPlayed) {
		super();
		this.id = id;
		this.name = name;
		this.genre = genre;
		this.hoursPlayed = hoursPlayed;
	}

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public Integer getHoursPlayed() {
		return hoursPlayed;
	}
	public void setHoursPlayed(Integer hoursPlayed) {
		this.hoursPlayed = hoursPlayed;
	}
}

