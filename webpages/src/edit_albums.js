const body = document.querySelector('body');

async function get_album_list(data) {
    const response = await fetch('/requests/albums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function create_album(data) {
    const response = await fetch('/requests/create_album', {
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

async function get_album_songs(data) {
    const response = await fetch('/requests/get_album_songs', {
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

async function get_non_album_songs(data) {
    const response = await fetch('/requests/get_non_album_songs', {
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


function insert_album_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Add Song';
    return Newbutton;
}

function delete_album_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Delete Song from Album';
    return Newbutton;
}

//create new album
const albumname = document.getElementById('albumname');
const albumSubmit = document.getElementById('albumSubmit');

albumSubmit.addEventListener('click', () => {
    if (albumname.value == "" || albumname.length == 0 || albumname == null){
        alert("Field cannot be empty");
    }
    else{
        create_album({UserID: user_id, Title: albumname.value}).then(create_album_results => {
            alert(`New Album Successfully Created`);
            CreateButtonID.appendChild(CreateAlbumTextBox);
            CreateButtonID.appendChild(createAlbum_button);
        });
    }
});

//dropdown menu to choose album
const choosealbum = document.getElementById('choosealbum');

get_album_list({UserID: user_id}).then(choosealbum_results => {
    for (const album_names of choosealbum_results.Info){
        var option = document.createElement("option");
        option.value = album_names.title;
        option.text = album_names.title.charAt(0).toUpperCase() + album_names.title.slice(1);
        choosealbum.appendChild(option);
    }
});


const song_album_list = document.getElementById('song_album_list');
const non_song_album_list = document.getElementById('non_song_album_list');

choosealbum.addEventListener('change', () => {
    //display album's songs
    get_album_songs({Title: choosealbum.value}).then(get_album_songs_results => {
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
        for (const song_album_info of get_album_songs_results.Info) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = song_album_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = song_album_info.rating;
            // const unique_id = song_album_info.id.toString();
            // cell = row.insertCell(-1);
            // const deleteSongButton = delete_album_song_button();
            // cell.appendChild(deleteSongButton);
            // deleteSongButton.addEventListener('click', () => {
            //     delete_song_album({UserID: user_id, Title: choosealbum.value, SongID: unique_id}).then(delete_song_album_results => {
            //         // song_info: {id, title, rating}
            //         alert(`Song ${song_album_info.title} Deleted from Album ${choosealbum.value}.`);
            //     });
            // });
        }

        song_album_list.innerHTML = "";
        song_album_list.appendChild(table);

    });

    //display non-playlist songs
    get_non_album_songs({UserID: user_id}).then(get_non_album_songs_results => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "0.5";

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
        for (const song_album_info of get_non_album_songs_results.Info) {
            row = table.insertRow(-1);
            var cell = row.insertCell(-1);
            cell.innerHTML = song_album_info.title;
            cell = row.insertCell(-1);
            cell.innerHTML = song_album_info.rating;
            const unique_id = song_album_info.id.toString();
            cell = row.insertCell(-1);
            const insertSongButton = insert_album_song_button();
            cell.appendChild(insertSongButton);
            insertSongButton.addEventListener('click', () => {
                insert_song_album({SongID: unique_id, Title: choosealbum.value}).then(insert_song_album_results => {
                    // song_info: {id, title, rating}
                    alert(`Song ${song_album_info.title} Added to Album ${choosealbum.value}`);
                });
            });
        }

        non_song_album_list.innerHTML = "";
        non_song_album_list.appendChild(table);

    });

    //Delete playlist
    const deletealbumbutton = document.getElementById('deleteAlbumButton');

    deletealbumbutton.addEventListener('click', () => {
        delete_album({Title: choosealbum.value, UserID: user_id}).then(get_non_album_songs_results => {
            alert(`Album ${choosealbum.value} was Deleted`);
        });
    });
});

