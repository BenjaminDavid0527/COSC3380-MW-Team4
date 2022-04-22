const body = document.querySelector('body');

const aname = document.getElementById('aname');
const anameSubmit = document.getElementById('anameSubmit');

const ptitle = document.getElementById('ptitle');
const ptitleSubmit = document.getElementById('ptitleSubmit');

const quantity = document.getElementById('quantity');
const nsongs = document.getElementById('nsongs');
const pinfoSubmit = document.getElementById('pinfoSubmit');

const stitle = document.getElementById('stitle');
const sinfoSubmit = document.getElementById('sinfoSubmit');

const playlist_list = document.getElementById('playlist_list');

// Need code to handle if no cookie stored for user
dc = document.cookie;
const start_idx = dc.indexOf('UserID')
const end_idx = dc.substr(start_idx).indexOf(';');
let user_id;
if (end_idx === -1) {
    user_id = parseInt(dc.substr(start_idx+7));
}
else {
    user_id = parseInt(dc.substr(start_idx+7, end_idx));
}

async function get_playlist_ainformation(data) {
    const response = await fetch('/requests/get_playlist_ainformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_playlist_ptitleinformation(data) {
    const response = await fetch('/requests/get_playlist_ptitleinformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_playlist_pinformationMT(data) {
    const response = await fetch('/requests/get_playlist_pinformationMT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function get_playlist_pinformationLT(data) {
    const response = await fetch('/requests/get_playlist_pinformationLT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function get_playlist_pinformationET(data) {
    const response = await fetch('/requests/get_playlist_pinformationET', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function get_playlist_pinformationNA(data) {
    const response = await fetch('/requests/get_playlist_pinformationNA', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_playlist_sinformation(data) {
    const response = await fetch('/requests/get_playlist_sinformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

anameSubmit.addEventListener('click', () => {
    if (aname.value == "" || aname.length == 0 || aname == null){
        alert("Artist Username must contain a value");
    }
    else{
        get_playlist_ainformation({ArtistName: aname.value})
        .then( (get_playlist_ainformation_response) => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Playlist Title", "Date Created", "Number of Songs"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const playlist_info of get_playlist_ainformation_response.Ainformation) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.date_created;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.song_count;
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});

ptitleSubmit.addEventListener('click', () => {
    if (ptitle.value == "" || ptitle.length == 0 || ptitle == null){
        alert("Playlist Title must contain a value");
    }
    else{
        get_playlist_ptitleinformation({PlaylistName: ptitle.value})
        .then( (get_playlist_ptitleinformation_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Playlist Title", "Date Created", "Number of Songs"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const playlist_info of get_playlist_ptitleinformation_response.Ptitleinformation) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.date_created;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.song_count;
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});

pinfoSubmit.addEventListener('click', () => {
    if(nsongs.value == "" || nsongs.length == 0 || nsongs == null ){
        alert("Number of Songs must contain a value");
    }
    else if(quantity.value == "More than"){
        get_playlist_pinformationMT({NSongs: nsongs.value})
        .then( (get_playlist_pinformationMT_response) => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Playlist Title", "Date Created", "Number of Songs"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const playlist_info of get_playlist_pinformationMT_response.PinformationMT) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.date_created;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.song_count;
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
    else if(quantity.value == "Less than"){
        get_playlist_pinformationLT({NSongs: nsongs.value})
        .then( (get_playlist_pinformationLT_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Playlist Title", "Date Created", "Number of Songs"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const playlist_info of get_playlist_pinformationLT_response.PinformationLT) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.date_created;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.song_count;
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
    else if(quantity.value == "Equal to"){
        get_playlist_pinformationET({NSongs: nsongs.value })
        .then( (get_playlist_pinformationET_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Playlist Title", "Date Created", "Number of Songs"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const playlist_info of get_playlist_pinformationET_response.PinformationET) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.date_created;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.song_count;
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});

sinfoSubmit.addEventListener('click', () => {
    if (stitle.value == "" || stitle.length == 0 || stitle == null){
        alert("Song Title must contain a value");
    }
    else{
        get_playlist_sinformation({SongTitle: stitle.value})
        .then( (get_playlist_sinformation_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Playlist Title", "Date Created", "Number of Songs"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const playlist_info of get_playlist_sinformation_response.Sinformation) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.date_created;
            cell = row.insertCell(-1);
            cell.innerHTML = playlist_info.song_count;
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});