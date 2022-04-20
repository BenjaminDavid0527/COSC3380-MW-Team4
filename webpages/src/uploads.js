uploadbtn.addEventListener('click', () => {
    upload_songs({Title: songTitle.value, UserID: user_id})
    .then( (upload_songs_response) => {
        alert("Song Successfully Uploaded");
        return false;
    });
});
deletebtn.addEventListener('click', () => {
    delete_songs({Title: songTitle.value, UserID: user_id})
    .then( (delete_songs_response) => {
        alert("Song Successfully Deleted");
        return false;
    });
});

async function upload_songs(data) {
    const response = await fetch('/requests/upload_songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
  }

  async function delete_songs(data) {
    const response = await fetch('/requests/delete_songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
  }