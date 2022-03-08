function createGame(){  // Create value in db
    const game = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        hoursPlayed: document.getElementById("hoursPlayed").value
    }

    fetch('/create', {
        method: 'post',
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
    const table = document.getElementById("DataTable")

    fetch('/getAll').then((response) => {
        if (response.status == 200) {
            return response.json();
        } else {
            alert("server not found")
        }
    }).then((data) => {
        console.log(data)
        data.forEach(row => {
            table.appendChild(createRow(row))
        });
    })
}

function createRow(rowData){
    const row = document.createElement("tr")

    row.id=`row-${rowData.id}`

    const id = document.createElement("td")
    id.innerHTML = rowData.id;
    row.appendChild(id)

    const name = document.createElement("td")
    name.innerHTML = rowData.name;
    row.appendChild(name)

    console.log(rowData.genre)
    const genre = document.createElement("td")
    genre.innerHTML = rowData.genre;
    row.appendChild(genre)

    const hours = document.createElement("td")
    hours.innerHTML = rowData.hoursPlayed;
    row.appendChild(hours)

    const actions = document.createElement("td")
    const delBtn = document.createElement("input")
    delBtn.type = "button"
    delBtn.value = "Delete"
    delBtn.addEventListener("click", () => deleteRow(rowData.id))
    actions.appendChild(delBtn)
    row.appendChild(actions)


    return row;
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

function deleteRow(rowID) {
    const row = document.getElementById(`row-${rowID}`)
    row.remove()
    deleteByID(rowID)
    console.log(row)
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

function deleteByID(gameId) {
    let failed = false;
    fetch(`/remove/${gameId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response == 204) {
                console.log(`Received: ${response.status}`)
            } else {
                console.log(`Expected: 204, Actual: ${response.status}`)
            }
        })
        .catch((error) => {
            console.error('Error =', error);
        })
}