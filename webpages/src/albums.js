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

async function create_album(data) {
    const response = await fetch('/requests/createalbums', {
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

function get_song_options() {
    const select = document.createElement('select');
    for (let counter = 1; counter <= 5; counter++) {
        const option = document.createElement('option');
        option.text = //song?;    
        option.value = counter;
        select.add(option);
    }
    return select;
}

function delete_album_button() {
    const button = document.createElement('button');
    button.textContent = 'Delete Playlist';
    return button;
}

function create_album_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'CreatePlaylist';
    return Newbutton;
}

function insert_album_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Add Song';
    return Newbutton;
}
function delete_album_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Delete Song';
    return Newbutton;
}

function create_album_text_box(){
    const text_box = document.createElement("input");
    text_box.setAttribute("type", "text");
    return text_box;
}

function create_insert_delete_album_box(){
    const text_box = document.createElement("input");
    text_box.setAttribute("type", "text");
    return text_box;
}

get_albums({UserID:user_id}).then(get_album_results => {
    const album_list = document.getElementById('album_list');
    const album_songs_list = document.getElementById('album_songs_list');
    const CreateButtonID = document.getElementById('createButton');

    for (const album_info of get_album_results.Info) {
        const li = document.createElement('li');
        const unique_id = album_info.id.toString();
        li.setAttribute('id', unique_id);

        const body = `Title: ${album_info.title}, ID = ${album_info.id}\t`
        li.innerHTML = body;

        const deleteButton = delete_album_button();

        const insertSongButton = insert_album_song_button();
        const deleteSongButton = delete_album_song_button();

        const CreateSelectionBox = create_selection_box();

        li.appendChild(CreateSelectionBox);

        deleteButton.addEventListener('click', () => {
            delete_album({UserID: user_id, Id: unique_id}), then(create_album_results => {
                alert(`Album ${unique_id} Deleted`);
                CreateButtonID.appendChild(CreateAlbumTextbox);
                CreateButtonID.appendChild(CreateAlbum_Button);

                const element = document.querySelector('li[id=\'' + unique_id + '\']');
                element.appendChild(deleteButton);
            });
        });

        deleteSongButton.addEventListener('click', () => {
            delete_song_album({SongID: CreateSelectionBox.value, Id: unique_id}).then(delete_song_album_results => {
                alert(`Song ${CreateSelectionBox.value} Deleted From Album ${unique_id}`);
                element.appendChild(deleteButton);
                CreateButtonID.appendChild(create_playlist_text_box);
            });
        });

        insertSongButton.addEventListener('click', () => {
            insert_song_album({SongID: CreateSelectionBox.value, Id: unique_id}).then(insert_song_album_results => {
                alert(`Song ${CreateSelectionBox.value} inserted into Album ${unique_id}`);
                CreateButtonID.appendChild(CreateSelectionBox);
                CreateButtonID.appendChild(CreateAlbum_Button);
            });
        });

        li.appendChild(deleteButton);
        li.appendChild(CreateSelectionBox);
        li.appendChild(insertSongButton);
        li.appendChild(deleteSongButton);
        }

        album_list.appendChild(li);

        const CreateAlbumTextbox = create_album_text_box();
        CreateButtonID.appendChild(CreateAlbumTextbox);

        const CreateAlbum_Button = create_album_button();
        CreateButtonID.appendChild(CreateAlbum_Button);

        CreateAlbum_Button.addEventListener('click', () => {
            create_album({UserID: user_id, Title: CreateAlbumTextbox.value}).then(create_album_results => {
                alert(`Album ${create_album_results.affectedRows} Created`);
                CreateButtonID.appendChild(CreateAlbumTextbox);
                CreateButtonID.appendChild(CreateAlbum_Button);
            });
        });
});
