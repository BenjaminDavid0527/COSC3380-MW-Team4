const body = document.querySelector('body');

async function get_playlists(data) {
    const response = await fetch('/requests/playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_playlists_songs(data) {
    const response = await fetch('/requests/get_playlists_songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}


async function get_non_playlists_songs(data) {
    const response = await fetch('/requests/get_non_playlists_songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

// data = {UserID, SongID, Rating, WasRated} (see where this is called)

async function create_playlist(data) {
    const response = await fetch('/requests/create_playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function delete_playlist(data) {
    const response = await fetch('/requests/delete_playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function delete_song_playlist(data) {
    const response = await fetch('/requests/delete_song_playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function insert_song_playlist(data) {
    const response = await fetch('/requests/insert_song_playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

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


function insert_playlist_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Add Song';
    return Newbutton;
}
function delete_playlist_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Delete Song from Playlist';
    return Newbutton;
}




//Create a new playlist
const npname = document.getElementById('npname');
const npSubmit = document.getElementById('npSubmit');

npSubmit.addEventListener('click', () => {
    if (npname.value == "" || npname.length == 0 || npname == null){
        alert("Field cannot be empty");
    }
    else{
        create_playlist({UserID: user_id, Title: npname.value}).then(create_playlist_results => {
            alert(`Playlist ${create_playlist_results.affectedRows} Created`);
            CreateButtonID.appendChild(CreatePlaylistTextBox);
            CreateButtonID.appendChild(createPlaylist_button);
        });
    }
});


//Choose a playlist select

const chooseplaylist = document.getElementById('chooseplaylist');


get_playlists({UserID: user_id}).then(chooseplatlist_results => {
    var select = document.createElement("select");

    for (const playlist_names of chooseplatlist_results.Info){
        var option = document.createElement("option");
        option.value = playlist_names.title;
        option.text = playlist_names.title.charAt(0).toUpperCase() + playlist_names.title.slice(1);
        chooseplaylist.appendChild(option);
    }
    // chooseplaylist.appendChild(select);
});

//Display playlist's songs as a table

const chooseplaylistSubmit = document.getElementById('chooseplaylistSubmit');
const song_playlist_list = document.getElementById('song_playlist_list');
const non_song_playlist_list = document.getElementById('non_song_playlist_list');

chooseplaylist.addEventListener('change', () => {
    //display playlist's songs
    get_playlists_songs({Title: chooseplaylist.value}).then(get_playlist_songs_results => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Song Title", "Rating", "Action"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }

        //Add the data rows.
        for (const song_playlist_info of get_playlist_songs_results.SongInformation) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = song_playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = song_playlist_info.rating;
            const unique_id = song_playlist_info.id.toString();
            cell = row.insertCell(-1);
            const deleteSongButton = delete_playlist_song_button();
            cell.appendChild(deleteSongButton);
            deleteSongButton.addEventListener('click', () => {
                delete_song_playlist({UserID: user_id, Title: chooseplaylist.value, SongID: unique_id}).then(delete_song_playlist_results => {
                    // song_info: {id, title, rating}
                    alert(`Song ${song_playlist_info.title} Deleted from Playlist ${chooseplaylist.value} Please Reload the Page to See the Changes`);
                });
            });
        }

        song_playlist_list.innerHTML = "";
        song_playlist_list.appendChild(table);

    });

    //display non-playlist songs
    get_non_playlists_songs({Title: chooseplaylist.value}).then(get_non_playlist_songs_results => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        customers.push(["Song Title", "Rating", "Action"]);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < 3; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }

        //Add the data rows.
        for (const song_playlist_info of get_non_playlist_songs_results.SongInformation) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = song_playlist_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = song_playlist_info.rating;
            const unique_id = song_playlist_info.id.toString();
            cell = row.insertCell(-1);
            const insertSongButton = insert_playlist_song_button();
            cell.appendChild(insertSongButton);
            insertSongButton.addEventListener('click', () => {
                insert_song_playlist({SongID: unique_id, Title: chooseplaylist.value}).then(insert_song_playlist_results => {
                    // song_info: {id, title, rating}
                    alert(`Song ${song_playlist_info.title} Inserted to Playlist ${chooseplaylist.value} Please Reload to See the Changes`);
                });
            });
        }

        non_song_playlist_list.innerHTML = "";
        non_song_playlist_list.appendChild(table);

    });

    //Delete playlist
    const deleteplaylistbutton = document.getElementById('deleteplaylistbutton');

    deleteplaylistbutton.addEventListener('click', () => {
        delete_playlist({Title: chooseplaylist.value, UserID: user_id}).then(get_non_playlist_songs_results => {
            alert(`Playlist ${chooseplaylist.value} was Deleted`)
        });
    });

});



