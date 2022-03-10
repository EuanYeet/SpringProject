Coverage: 97%
# Spring - Project

A webpage that interacts with an API created in Spring via a javascript file, to perform CRUD functionality to a mySQL database

## Getting Started

STEP 1: Run game-schema.sql to create the database
STEP 2: Change application-prod.properties to match your database

This should create an instance of a database on your local machine in which the project can interact with

### Prerequisites

Recommended prior installations

```
Java (1.8 or Higher)
Maven (3.8.4 or Higher)
Spring Tools 4(4.13.1 or Higher)
```

## Design

### Risk Assessment

[Risk Matrix](https://drive.google.com/file/d/1vXOSIDyPHMQJH8KM96uHOWTb-FHJikhp/view?usp=sharing)

### UML Class Diagram

[UML Diagram](https://drive.google.com/file/d/1gYIqgVaqdazsM92xsRpT3s-Zxq6Ii3U1/view?usp=sharing)

### WebPage Design

[Web Page Design](https://docs.google.com/drawings/d/19yPA5nMLKtO78OKkdaSaarJC9Jzx72zo6Yw4a2IWLOM/edit?usp=sharing)

### Jira Board

[Jira Board](https://euan-black.atlassian.net/jira/software/projects/ESP/boards/8/roadmap)

### Git Feature Branch Model

![Git FBM](https://i.gyazo.com/b5e8b4bbc1018ca7682a4f7131f2c404.png)

## Running the tests

Explain how to run the automated tests for this system. Break down into which tests and what they do

### Integration Tests 

Integration tests work to test that the functionality of a given method works in conjunction with any others it relies on provided with set results.

```
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
```

## Built With

* [Maven](https://maven.apache.org/) - Dependency Management

## Authors

* **Euan Black** - *Initial Version* - [EuanYeet](https://github.com/EuanYeet)

## License

This project is licensed under the MIT license - see the [LICENSE.md](LICENSE.md) file for details 
