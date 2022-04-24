//Get Playlist Songs
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



//Get all playlist
async function get_all_playlist(data) {
    const response = await fetch('/requests/get_all_playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

const searchplaylist = document.getElementById('searchplaylist');

get_all_playlist({ArtistName: "A"})
.then( (get_all_playlist_response) => {
    for(const server_information of get_all_playlist_response.Info){
        const li = document.createElement('li');
        li.tagName = "a"
        li.innerHTML = server_information.title;
        li.onclick = 
        li.addEventListener('click', () => {
        get_playlist_ptitleinformation({PlaylistName: li.innerHTML})
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


        get_playlists_songs({Title: li.innerHTML}).then(get_playlist_songs_results => {
            //Create a HTML Table element.
            var table = document.createElement("TABLE");
            table.border = "1";
    
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
            for (const song_playlist_info of get_playlist_songs_results.SongInformation) {
                row = table.insertRow(-1);
                var cell = row.insertCell(-1);
                cell.innerHTML = song_playlist_info.title;
                cell = row.insertCell(-1);
                cell.innerHTML = song_playlist_info.rating;
            }
    
            song_playlist_list.innerHTML = "";
            song_playlist_list.appendChild(table);
    
        });

    });
        searchplaylist.appendChild(li);
    }
    const myInput = document.getElementById('myInput');
    //Filter by name
    myInput.addEventListener('keyup', () => {
    const filter = myInput.value.toUpperCase();
    for (i = 1; i <= (searchplaylist.childNodes.length)-1; i++) {
        var k = i;
        var a = searchplaylist.childNodes[i].innerText;
        var txtValue = a;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            searchplaylist.childNodes[i].style.display = "";
        } else {
            searchplaylist.childNodes[i].style.display = "none";
        }
      }
    });
});