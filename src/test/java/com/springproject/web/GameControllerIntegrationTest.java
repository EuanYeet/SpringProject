package com.springproject.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springproject.domain.Game;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts= {"classpath:game-schema.sql", "classpath:game-data.sql"}, executionPhase=ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles("test")
public class GameControllerIntegrationTest {
	
	@Autowired
	private MockMvc mvc; // Acts like postman -- performs request
	@Autowired
	private ObjectMapper mapper; // Java <--> JSON conversion
	
	
	@Test
	void testCreate() throws Exception {
		Game testGame = new Game(null, "Runescape","MMORPG", 4500);
		String testGameAsJSON = this.mapper.writeValueAsString(testGame);
		RequestBuilder req = post("/create").contentType(MediaType.APPLICATION_JSON).content(testGameAsJSON);
		
		Game testCreatedGame = new Game(3,"Runescape","MMORPG", 4500);
		String testCreatedGameAsJSON = this.mapper.writeValueAsString(testCreatedGame);
		
		ResultMatcher checkStatus = status().isCreated(); // Status 201 - Created
		ResultMatcher checkBody = content().json(testCreatedGameAsJSON);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	void testGetAll() throws Exception {
		RequestBuilder req = get("/getAll"); // Status 200 - OK
		List<Game> games = List.of(new Game(1, "Halo","FPS", 400), new Game(2,"Witcher 3","RPG",700));
		String gamesAsJSON = this.mapper.writeValueAsString(games);
		
		ResultMatcher checkStatus = status().isOk();
		ResultMatcher checkBody = content().json(gamesAsJSON);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	 
	@Test
	void testGetById() throws Exception {
		RequestBuilder req = get("/getById/1"); // Status 200 - OK
		Game game = new Game(1, "Halo", "FPS", 400);
		String gameAsJSON = this.mapper.writeValueAsString(game);
		
		ResultMatcher checkStatus = status().isOk();
		ResultMatcher checkBody = content().json(gameAsJSON);
		
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
	@Test
	void testReplace() throws Exception {
		Game replace = new Game(null, "World of Warcraft","MMORPG",2400);
		String replaceAsJSON = this.mapper.writeValueAsString(replace);
		
		RequestBuilder req = put("/replace/1").contentType(MediaType.APPLICATION_JSON).content(replaceAsJSON);
		
		Game replaced = new Game(1, "World of Warcraft","MMORPG",2400);
		String replacedAsJson = this.mapper.writeValueAsString(replaced);
		
		ResultMatcher checkStatus = status().isAccepted(); // Status 201 - Created
		ResultMatcher checkBody = content().json(replacedAsJson);
		
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
	@Test
	void testRemove() throws Exception {
		RequestBuilder req = delete("/remove/1");
		
		ResultMatcher checkStatus = status().isNoContent(); // Status 204 - No Content
		
		this.mvc.perform(req).andExpect(checkStatus);
	}
	
	
}