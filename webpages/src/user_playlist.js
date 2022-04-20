const body = document.getElementById('playlistbody');

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

get_playlists({UserID: user_id}).then(get_playlist_results => {
    const playlist_list = document.getElementById('playlist_list');

    for (const playlist_info of get_playlist_results.Info) {
        const li = document.createElement('li');
        const unique_id = playlist_info.id.toString();
        li.setAttribute('id', unique_id);

        const body = `Title: ${playlist_info.title}, ID: ${playlist_info.id}\t`
        li.innerHTML = body;

        playlist_list.appendChild(li);
    }
});

