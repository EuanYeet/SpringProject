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

let refTable;
function getGame() {
    let refPromise = fetch('/getAll') // Get all
    refPromise.then(
        function (response) {
            console.log(response.status)
            if (response.status == 200) {
                let refResponsePromise = response.json()
                refResponsePromise.then(function (game) {
                    console.log(game)

                    refTable = document.createElement("table")
                    refTable.style.border=1
        
                    let refRowHead= document.createElement("tr")
                    let refDataHead1=document.createElement("td")
                    let refDataHead2=document.createElement("td")
                    let refDataHead3=document.createElement("td")
                    let refDataHead4=document.createElement("td")

                    refDataHead1.innerHTML="ID";
                    refDataHead2.innerHTML="NAME";
                    refDataHead3.innerHTML="GENRE";
                    refDataHead4.innerHTML="HOURS PLAYED";

                    refRowHead.appendChild(refDataHead1)
                    refRowHead.appendChild(refDataHead2)
                    refRowHead.appendChild(refDataHead3)
                    refRowHead.appendChild(refDataHead4)

                    refTable.appendChild(refRowHead)

                    for (let i = 0; i < game.length; i++) {
                        appendTable(game[i].id,game[i].name,game[i].genre, game[i].hoursPlayed);
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

function appendTable(id, Gname, genre, hours){
    let refRow1 = document.createElement("tr")

    let refTd1 = document.createElement("td")
    let refTd2 = document.createElement("td")
    let refTd3 = document.createElement("td")
    let refTd4 = document.createElement("td")

    let refDelBtn = document.createElement("input")
    let refUpdateBtn = document.createElement("input")

    



    refTd1.innerHTML = id
    refTd2.innerHTML = Gname
    refTd3.innerHTML = genre
    refTd4.innerHTML = hours

    refRow1.appendChild(refTd1)
    refRow1.appendChild(refTd2)
    refRow1.appendChild(refTd3)
    refRow1.appendChild(refTd4)
    

    refTable.appendChild(refRow1)
    document.body.append(refTable)
}

function deleteRow(row) {
    let delRow = row.parentNode.parentNode.rowIndex;
    document.getElementById("DataTable").deleteRow(delRow);
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