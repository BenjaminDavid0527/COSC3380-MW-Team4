const d_songs_list = document.getElementById('d_songs')
const d_playlists_list = document.getElementById('d_playlists')
const d_albums_list = document.getElementById('d_albums')
const d_users_list = document.getElementById('d_users')

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

if (user_id !== 1) {
    window.location.href = "/";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
  
const handle_logout = (event) => {
    deleteCookie("UserID");
    window.location.href = "/";
}
document.getElementById('logout_btn').addEventListener('click', handle_logout);

async function get_songs(data) {
    const response = await fetch('/requests/admin/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function modify_title(data) {
    const response = await fetch('/requests/admin/rename_song', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function change_rating(data) {
    const response = await fetch('/requests/admin/change_rating', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function delete_song(data) {
    const response = await fetch('/requests/admin/delete_song', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

get_songs().then(results => {
    const song_table = document.createElement('TABLE')
    song_table.border = 1;

    // let i = 0;
    for (const song of results.Songs) {
        const input_rename = document.createElement('input');
        const rename_button = document.createElement('button');
        const input_rating = document.createElement('input');
        const rating_button = document.createElement('button');
        const delete_button = document.createElement('button');

        const table_row = song_table.insertRow(-1);
        // table_row.setAttribute('id', 'row_' + i);

        input_rename.defaultValue = song.title;
        input_rename.setAttribute('id', 'rename_' + song.id)
        input_rating.defaultValue = song.rating;
        input_rating.setAttribute('id', 'rating_' + song.id)
        
        rename_button.innerHTML = 'Rename';
        rating_button.innerHTML = 'Change';
        delete_button.innerHTML = 'Delete Song';
        
        rename_button.addEventListener('click', () => {
            const newName = document.getElementById('rename_' + song.id).value;
            modify_title({'ID': song.id, 'NewName': newName}).then(result => {
                if (result.Success) {
                    table_row.cells.item(0).innerHTML = newName;
                }
            });
        });
        
        rating_button.addEventListener('click', () => {
            const newRating = document.getElementById('rating_' + song.id).value;
            change_rating({'ID': song.id, 'NewRating': newRating}).then(result => {
                if (result.Success) {
                    table_row.cells.item(3).innerHTML = newRating;
                }
            });
        });
        
        delete_button.addEventListener('click', () => {
            delete_song({'ID': song.id}).then(result => {
                if (result.Success) {
                    //song_table.removeChild(table_row);
                    song_table.childNodes[0].removeChild(table_row);
                }
            });
        });
        
        var cell = table_row.insertCell(-1);
        cell.innerHTML = song.title;
        table_row.insertCell(-1).appendChild(input_rename);
        table_row.insertCell(-1).appendChild(rename_button);
        cell = table_row.insertCell(-1);
        cell.innerHTML = song.rating;
        table_row.insertCell(-1).appendChild(input_rating);
        table_row.insertCell(-1).appendChild(rating_button);
        table_row.insertCell(-1).appendChild(delete_button);

    }
    d_songs_list.appendChild(song_table);
});