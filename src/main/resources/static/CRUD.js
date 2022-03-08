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

    const updateBtn = document.createElement("input")
    updateBtn.type = "button"
    updateBtn.value = "Update"
    updateBtn.addEventListener("click", () => updateRow(rowData.id))

    actions.appendChild(updateBtn)
    actions.appendChild(delBtn)
    row.appendChild(actions)


    return row;
}

function getGameByID() {
    let gameIds = document.getElementById("gameId").value
    fetch('/getById/' + gameIds).then((response) => {
        if (response.status == 200) {
            return response.json();
        } else {
            alert("server not found")
        }
    }).then((data) => alert(`ID: ${data.id}, NAME: ${data.name}, GENRE: ${data.genre}, Hours Played: ${data.hoursPlayed}`))     
}
    


function deleteRow(rowID) {
    const row = document.getElementById(`row-${rowID}`)
    row.remove()
    deleteByID(rowID)
    console.log(row)
}

// function updateRow(rowID) {
//     const row = document.getElementById(`row-${rowID}`)
//     console.log(row.children)

//     const nameBox = document.createElement("input")
//     nameBox.value = row.children.item(1).innerHTML
//     row.children.item(1).replaceWith(nameBox)

//     const preGenre = row.children.item(2).innerHTML
//     const genreBox = document.createElement("input")
//     genreBox.value = preGenre
//     row.children.item(2).replaceWith(genreBox)

//     const preHour = row.children.item(3).innerHTML
//     const hourBox = document.createElement("input")
//     hourBox.value = preHour
//     row.children.item(3).replaceWith(hourBox)

//     row.children.item(4).children.item(0).removeEventListener("click", updateRow())
//     row.children.item(4).children.item(0).value = "Confirm"
//     row.children.item(4).children.item(0).addEventListener("click", confirmUpdate())
// }


function confirmUpdate(){
    console.log("Confirm")
}

function update(rowID) {
    const game = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        hoursPlayed: document.getElementById("hours_played").value
    }

    fetch('/replace/' + gameId, {
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