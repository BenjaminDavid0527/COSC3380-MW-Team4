const body = document.getElementById('albumbody');

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

get_albums({UserID: user_id}).then(results => {
    const album_list = document.getElementById('album_list');
    
    for (const album_info of results.Info) {
        const li = document.createElement('li');
        const body = `Title: ${album_info.title}\t`
        li.innerHTML = body;
        album_list.appendChild(li);
    }
}); 