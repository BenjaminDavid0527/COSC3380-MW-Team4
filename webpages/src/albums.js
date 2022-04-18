const body = document.querySelector('body');


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

// async function get_playlists_songs(data) {
//     const response = await fetch('/requests/get_playlists_songs', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application.json'
//         },
//         body: JSON.stringify(data)
//     })
//     return response.json();
// }

// // data = {UserID, SongID, Rating, WasRated} (see where this is called)
// async function rate_song(data) {
//     let response = await fetch('/requests/rating', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application.json'
//         },
//         body: JSON.stringify(data)
//     });
//     return response.json();
// }

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

async function insert_song_album(data) {
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

function get_rating_options() {
    const select = document.createElement('select');
    for (let counter = 1; counter <= 5; counter++) {
        const option = document.createElement('option');
        option.text = counter.toString();    
        option.value = counter;
        select.add(option);
    }
    return select;
}

function get_rating_button() {
    const button = document.createElement('button');
    button.textContent = 'Submit';
    return button;
}

function delete_playlist_button() {
    const button = document.createElement('button');
    button.textContent = 'Delete Playlist';
    return button;
}

function create_playlist_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'CreatePlaylist';
    return Newbutton;
}

function insert_playlist_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Add Song';
    return Newbutton;
}
function delete_playlist_song_button() {
    const Newbutton = document.createElement('button');
    Newbutton.textContent = 'Delete Song';
    return Newbutton;
}

function create_playlist_text_box(){
    const text_box = document.createElement("input");
    text_box.setAttribute("type", "text");
    return text_box;
}
function create_insert_delete_text_box(){
    const text_box = document.createElement("input");
    text_box.setAttribute("type", "text");
    return text_box;
}


//get_playlist_results = {Id: [], Title: []}
get_playlists({UserID: user_id}).then(get_playlist_results => {
    const playlist_list = document.getElementById('playlist_list');
    const playlist_songs_list = document.getElementById('playlist_songs_list');
    const CreateButtonID = document.getElementById('createButton');

    // playlist_info: {id, title}
    for (const playlist_info of get_playlist_results.Info) {
        const li = document.createElement('li');
        const unique_id = playlist_info.id.toString();
        li.setAttribute('id', unique_id);



        const body = `Title: ${playlist_info.title}, ID: ${playlist_info.id}\t`
        li.innerHTML = body;

        const deleteButton = delete_playlist_button();

        const insertSongButton = insert_playlist_song_button();
        const deleteSongButton = delete_playlist_song_button();

        const CreateInsertDeleteTextBox = create_insert_delete_text_box();

        li.appendChild(CreateInsertDeleteTextBox);
        

        deleteButton.addEventListener('click', () => {
            delete_playlist({UserID: user_id, Id: unique_id}).then(create_playlist_results => {
                // song_info: {id, title, rating}
                alert(`Playlist ${unique_id} Deleted`);
                CreateButtonID.appendChild(CreatePlaylistTextBox);
                CreateButtonID.appendChild(createPlaylist_button);
                    // const newBody = `Title: ${playlist_info.title}, ID: ${playlist_info.id}\t`
                    const element = document.querySelector('li[id=\'' + unique_id + '\']');
                    element.appendChild(deleteButton);
            });
        });
        
        deleteSongButton.addEventListener('click', () => {
            delete_song_playlist({SongID: CreateInsertDeleteTextBox.value, Id: unique_id}).then(delete_song_playlist_results => {
                // song_info: {id, title, rating}
                alert(`Song ${CreateInsertDeleteTextBox.value} Deleted from Playlist ${unique_id}`);
                    // const newBody = `Title: ${playlist_info.title}, ID: ${playlist_info.id}\t`
                    // const element = document.querySelector('li[id=\'' + unique_id + '\']');
                    element.appendChild(deleteButton);
                    CreateButtonID.appendChild(CreatePlaylistTextBox);
                    CreateButtonID.appendChild(createPlaylist_button);
            });
        });
        insertSongButton.addEventListener('click', () => {
            insert_song_playlist({SongID: CreateInsertDeleteTextBox.value, Id: unique_id}).then(insert_song_playlist_results => {
                // song_info: {id, title, rating}
                alert(`Song ${CreateInsertDeleteTextBox.value} Inserted into Playlist ${unique_id}`);
                // const newBody = `Title: ${playlist_info.title}, ID: ${playlist_info.id}\t`
                // const element = document.querySelector('li[id=\'' + unique_id + '\']');
                CreateButtonID.appendChild(CreatePlaylistTextBox);
                CreateButtonID.appendChild(createPlaylist_button);
            });
        });
        li.appendChild(deleteButton);
        li.appendChild(CreateInsertDeleteTextBox);
        li.appendChild(insertSongButton);
        li.appendChild(deleteSongButton);


        playlist_list.appendChild(li);
        
        // get_playlists_songs({Id: unique_id}).then(get_playlist_songs_results => {
        //     // for (const playlist_songs_info of get_playlist_songs_results.Infor){
        //         // const la = document.createElement('la');
        //         // la.setAttribute('id', unique_id);
                
        //         const body2 = `Title: ${get_playlist_songs_results}\t`
        //         // la.innerHTML = body2;
        //         playlist_songs_list.innerHTML = body2;

        //         // playlist_list.appendChild(body2);

        //     //     // playlist_songs_list.appendChild(la);
        //     // }
        // });
        
    }

    const CreatePlaylistTextBox = create_playlist_text_box();
    CreateButtonID.appendChild(CreatePlaylistTextBox);

    const createPlaylist_button = create_playlist_button();
    CreateButtonID.appendChild(createPlaylist_button);



    createPlaylist_button.addEventListener('click', () => {
        create_playlist({UserID: user_id, Title: CreatePlaylistTextBox.value}).then(create_playlist_results => {
            alert(`Playlist ${create_playlist_results.affectedRows} Created`);
            CreateButtonID.appendChild(CreatePlaylistTextBox);
            CreateButtonID.appendChild(createPlaylist_button);
            
        
        });
    });
});