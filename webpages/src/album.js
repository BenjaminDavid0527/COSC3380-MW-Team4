const body = document.querySelector('body');

async function get_albums(data) {
    const response = await fetch('/requests/albums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_all_albums(data) {
    const response = await fetch('/requests/get_all_albums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_album_ptitleinformation(data) {
    const response = await fetch('/requests/get_album_ptitleinformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_albumsongs(data) {
    const response = await fetch('/requests/get_album_songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function delete_album(data) {
    const response = await fetch('/requests/delete_album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function delete_song_album(data) {
    const response = await fetch('/requests/delete_song_album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function insert_song_album(data) {
    const response = await fetch('/requests/insert_song_album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

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

const searchalbum = document.getElementById('searchalbum');
const album_list = document.getElementById("album_list");
const song_album_list = document.getElementById("song_album_list");

get_all_albums({ArtistName: "A"})
.then( (get_all_album_response) => {
    for(const server_information of get_all_album_response.Info){
        const li = document.createElement('li');
        li.tagName = "a"
        li.innerHTML = server_information.title;
        li.addEventListener('click', () => {
            get_album_ptitleinformation({AlbumName: li.innerHTML})
                                .then( (get_album_ptitleinformation_response) => {
                                            //Create a HTML Table element.
                                var table = document.createElement("TABLE");
                                table.border = "0.5";

                                var customers = new Array();
                                customers.push(["Album Title"]);

                                //Add the header row.
                                var row = table.insertRow(-1);
                                for (var i = 0; i < 1; i++) {
                                    var headerCell = document.createElement("TH");
                                    headerCell.innerHTML = customers[0][i];
                                    row.appendChild(headerCell);
                                }
                                //Add the data rows.
                                for (const album_info of get_album_ptitleinformation_response.Info) {
                                    row = table.insertRow(-1);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = album_info.title;
                                    // cell = row.insertCell(-1);
                                    // cell.innerHTML = album_info.song_count;
                                }

                                album_list.innerHTML = "";
                                album_list.appendChild(table);
                                });

                get_albumsongs({Title: li.innerHTML}).then(get_albumsongs_results => { 
                                    //Create a HTML Table element.
                                    var table = document.createElement("TABLE");
                                    table.border = "0.5";
                            
                                    var customers = new Array();
                                    customers.push(["Song Title", "Rating"]);
                            
                                    //Add the header row.
                                    var row = table.insertRow(-1);
                                    for (var i = 0; i < 2; i++) {
                                        var headerCell = document.createElement("TH");
                                        headerCell.innerHTML = customers[0][i];
                                        row.appendChild(headerCell);
                                    }
                            
                                    //Add the data rows.
                                    for (const song_album_info of get_albumsongs_results.Info) {
                                        row = table.insertRow(-1);
                                        var cell = row.insertCell(-1);
                                        cell.innerHTML = song_album_info.title;
                                        cell = row.insertCell(-1);
                                        cell.innerHTML = song_album_info.rating;
                                    }
                            
                                    song_album_list.innerHTML = "";
                                    song_album_list.appendChild(table);
                            
                                });

                            });
        searchalbum.appendChild(li);
    }

    const myInput = document.getElementById('myInput');
    //Filter by name
    myInput.addEventListener('keyup', () => {
    const filter = myInput.value.toUpperCase();
    for (i = 1; i <= (searchalbum.childNodes.length)-1; i++) {
        var k = i;
        var a = searchalbum.childNodes[i].innerText;
        var txtValue = a;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            searchalbum.childNodes[i].style.display = "";
        } else {
            searchalbum.childNodes[i].style.display = "none";
        }
      }
    });
});