function createGame(){  // Create value in db
    const game = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        hoursPlayed: document.getElementById("hours_played").value
    }

    fetch('/create', {
        method: '/post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
    .then(game => {
        console.log('', game);
    })
    .catch((error) => {
        console.error('Error =', error);
    })
}

function getGame() {
    let refPromise = fetch('/getAll') // Get all
    refPromise.then(
        function (response) {
            console.log(response.status)
            if (response.status == 200) {
                let refResponsePromise = response.json()
                refResponsePromise.then(function (game) {
                    console.log(game)

                    for (let i = 0; i < game.length; i++) {
                        let refDiv = document.createElement("div")
                        refDiv.innerHTML = game[i].id + "  " + game[i].name + "  " + game[i].genre + "  " + game[i].hoursPlayed
                        document.body.appendChild(refDiv)
                    }
                })
            }
            else {
                alert("Server not found")
            }
        }
    )
}

function getGameByID() {
    let gameIds = document.getElementById("gameId").value

    let refPromise = fetch('/getById/' + gameIds) // Get by ID
    refPromise.then(
        function (response) {
            console.log(response.status)
            if (response.status == 200) {
                let refResponsePromise = response.json()
                refResponsePromise.then(function (game) {
                    console.log(game)

                    for (let i = 0; i < game.length; i++) {
                        
                            let refDiv = document.createElement("div")
                            refDiv.innerHTML = game[i].id + "  " + game[i].name + "  " + game[i].genre + "  " + game[i].hoursPlayed
                            document.body.appendChild(refDiv)
                        
                    }
                })
            }
            else {
                alert("Server not found")
            }
        }
    )
}

function update() {
    const game = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        hoursPlayed: document.getElementById("hours_played").value
    }

    let refPromise = fetch('/replace/' + gameId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
    .then(game => {
        console.log('', game);
        getGame();
    })
    .catch((error) => {
        console.error('Error =', error);
    })
}

function deleteByID() {
    let refPromise = fetch('/remove/'+gameId, {
    method: 'DELETE',
    })
    .then(response => response.json())
    .then(game => {
        console.log('', game);
        getGame();
    })
    .catch((error) => {
        console.error('Error =', error);
    })
}
