function pageLoad() {
    getGame()

    document.getElementById("submitBtn").addEventListener("click", async () => {
        await createGame()
        getGame()
    })
}

function createGame() {  // Create value in db
    const game = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        hoursPlayed: document.getElementById("hoursPlayed").value
    }

    return fetch('/create', {
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
    table.innerHTML = ""

    table.appendChild(createHead())

    fetch('/getAll').then((response) => {
        if (response.status == 200) {
            return response.json();
        } else {
            alert("server not found")
        }
    }).then((rows) => {
        rows.forEach((row) => {
            table.appendChild(createRow(row))
        })
    })
}

function createHead() {
    const headers = ["ID", "NAME", "GENRE", "HOURS PLAYED", "ACTIONS"]
    const row = document.createElement("tr")

    headers.forEach((header) => {
        const thElement = document.createElement("th")
        thElement.innerHTML = header
        row.appendChild(thElement)

    })

    return row
}

function createRow(rowData) {
    const row = document.createElement("tr")

    row.id = `row-${rowData.id}`

    const id = document.createElement("td")
    id.innerHTML = rowData.id;
    row.appendChild(id)

    const name = document.createElement("td")
    name.innerHTML = rowData.name;
    row.appendChild(name)

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

async function deleteRow(rowID) {
    const row = document.getElementById(`row-${rowID}`)
    await deleteByID(rowID)
    getGame()
    console.log(row)
}

let updating = false
function updateRow(rowID) {
    const row = document.getElementById(`row-${rowID}`)
    if (row !== null && !updating) {
        updating = true
        console.log(row.children)

        const nameBox = document.createElement("input")
        nameBox.value = row.children.item(1).innerHTML
        row.children.item(1).firstChild.replaceWith(nameBox)

        const preGenre = row.children.item(2).innerHTML
        const genreBox = document.createElement("input")
        genreBox.value = preGenre
        row.children.item(2).firstChild.replaceWith(genreBox)

        const preHour = row.children.item(3).innerHTML
        const hourBox = document.createElement("input")
        hourBox.value = preHour
        row.children.item(3).firstChild.replaceWith(hourBox)

        const confirmBtn = document.createElement("input")
        confirmBtn.type = "button"
        confirmBtn.value = "Confirm"
        confirmBtn.addEventListener("click", () => confirmUpdate(row))

        row.children.item(4).firstChild.replaceWith(confirmBtn)
        row.children.item(4).lastChild.remove()
    }

}


async function confirmUpdate(row) {
    const gameData = {
        name: row.children.item(1).firstChild.value,
        genre: row.children.item(2).firstChild.value,
        hoursPlayed: row.children.item(3).firstChild.value
    }
    const rowIdentifier = Number.parseInt(row.id.split("-")[1])
    console.log(gameData);
    
    await update(rowIdentifier, gameData)

    getGame()

    console.log("Confirm")
    updating = false
}

function update(gameID, data) {
    return fetch(`/replace/${gameID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('', data);
            return data
        })
        .catch((error) => {
            console.error('Error =', error);
        })
}

function deleteByID(gameID) {
    return fetch(`/remove/${gameID}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status == 204) {
                console.log(`Received: ${response.status}`)
                
            } else {
                console.log(`Expected: 204, Actual: ${response.status}`)
            }
        })
        .catch((error) => {
            console.error('Error =', error);
        })
}