const body = document.querySelector('body');

const titlecheckbox = document.getElementById('titlecheckbox');
const artistcheckbox = document.getElementById('artistcheckbox');
const lengthcheckbox = document.getElementById('lengthcheckbox');
const uploaddatecheckbox = document.getElementById('uploaddatecheckbox');
const sizecheckbox = document.getElementById('sizecheckbox');
const ratingcheckbox = document.getElementById('ratingcheckbox');

const aname = document.getElementById('aname');
const anameSubmit = document.getElementById('anameSubmit');

const ptitle = document.getElementById('ptitle');
const ptitleSubmit = document.getElementById('ptitleSubmit');

const quantity = document.getElementById('quantity');
const nsongs = document.getElementById('nsongs');
const pinfoSubmit = document.getElementById('pinfoSubmit');

const stitle = document.getElementById('stitle');
const sinfoSubmit = document.getElementById('sinfoSubmit');

const playlist_list = document.getElementById('playlist_list');

const song_playlist_list = document.getElementById('song_playlist_list');

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

async function get_album_ainformation(data) {
    const response = await fetch('/requests/get_album_ainformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_Album_stitleinformation(data) {
    const response = await fetch('/requests/get_Album_stitleinformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function get_album_pinformationMT(data) {
    const response = await fetch('/requests/get_album_pinformationMT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function get_album_pinformationLT(data) {
    const response = await fetch('/requests/get_album_pinformationLT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
async function get_album_pinformationET(data) {
    const response = await fetch('/requests/get_album_pinformationET', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}


anameSubmit.addEventListener('click', () => {
    if (aname.value == "" || aname.length == 0 || aname == null){
        alert("Artist Username must contain a value");
    }
    else{
        get_album_ainformation({ArtistName: aname.value})
        .then( (get_album_ainformation_response) => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        var countCustomers = 0;

        if(titlecheckbox.checked){
            customers.push(["Album Title"]);
            countCustomers++;
        }
        // if(artistcheckbox.checked){
        //     customers.push(["Artist Name"]);
        //     countCustomers++;
        // }
        // if(lengthcheckbox.checked){
        //     customers.push(["Length of Song"]);
        //     countCustomers++;
        // }
        if(uploaddatecheckbox.checked){
            customers.push(["Creation Date"]);
            countCustomers++;
        }
        // if(sizecheckbox.checked){
        //     customers.push(["Size of File"]);
        //     countCustomers++;
        // }
        if(ratingcheckbox.checked){
            customers.push(["Number of Songs"]);
            countCustomers++;
        }

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < countCustomers; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const song_ainfo of get_album_ainformation_response.AlbumAinformation) {
            row = table.insertRow(-1);            
            if(titlecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = song_ainfo.title;
            }
            // if(artistcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = aname.value;
            // }
            // if(lengthcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = song_ainfo.length_seconds;
            // }
            if(uploaddatecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = song_ainfo.date_created;
            }
            // if(sizecheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = song_ainfo.size;
            // }
            if(ratingcheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = song_ainfo.song_count;
            }
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});

ptitleSubmit.addEventListener('click', () => {
    if (ptitle.value == "" || ptitle.length == 0 || ptitle == null){
        alert("Playlist Title must contain a value");
    }
    else{
        get_Album_stitleinformation({AlbumName: ptitle.value})
        .then( (get_album_stitleinformation_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        var countCustomers = 0;

        if(titlecheckbox.checked){
            customers.push(["Album Title"]);
            countCustomers++;
        }
        // if(artistcheckbox.checked){
        //     customers.push(["Artist Name"]);
        //     countCustomers++;
        // }
        // if(lengthcheckbox.checked){
        //     customers.push(["Length of Song"]);
        //     countCustomers++;
        // }
        if(uploaddatecheckbox.checked){
            customers.push(["Creation Date"]);
            countCustomers++;
        }
        // if(sizecheckbox.checked){
        //     customers.push(["Size of File"]);
        //     countCustomers++;
        // }
        if(ratingcheckbox.checked){
            customers.push(["Number of Songs"]);
            countCustomers++;
        }

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < countCustomers; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const Album_titleinfo of get_album_stitleinformation_response.AlbumAinformation) {
            row = table.insertRow(-1);            
            if(titlecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.title;
            }
            // if(artistcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = aname.value;
            // }
            // if(lengthcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.length_seconds;
            // }
            if(uploaddatecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.date_created;
            }
            // if(sizecheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.size;
            // }
            if(ratingcheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.song_count;
            }
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});

pinfoSubmit.addEventListener('click', () => {
    if(nsongs.value == "" || nsongs.length == 0 || nsongs == null ){
        alert("Number of Songs must contain a value");
    }
    else if(quantity.value == "More than"){
        get_album_pinformationMT({NSongs: nsongs.value})
        .then( (get_album_pinformationMT_response) => {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        var countCustomers = 0;

        if(titlecheckbox.checked){
            customers.push(["Album Title"]);
            countCustomers++;
        }
        // if(artistcheckbox.checked){
        //     customers.push(["Artist Name"]);
        //     countCustomers++;
        // }
        // if(lengthcheckbox.checked){
        //     customers.push(["Length of Song"]);
        //     countCustomers++;
        // }
        if(uploaddatecheckbox.checked){
            customers.push(["Creation Date"]);
            countCustomers++;
        }
        // if(sizecheckbox.checked){
        //     customers.push(["Size of File"]);
        //     countCustomers++;
        // }
        if(ratingcheckbox.checked){
            customers.push(["Number of Songs"]);
            countCustomers++;
        }

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < countCustomers; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const Album_titleinfo of get_album_pinformationMT_response.AlbumAinformation) {
            row = table.insertRow(-1);            
            if(titlecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.title;
            }
            // if(artistcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = aname.value;
            // }
            // if(lengthcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.length_seconds;
            // }
            if(uploaddatecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.date_created;
            }
            // if(sizecheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.size;
            // }
            if(ratingcheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.song_count;
            }
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
    else if(quantity.value == "Less than"){
        get_album_pinformationLT({NSongs: nsongs.value})
        .then( (get_song_pinformationLT_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        var countCustomers = 0;

        if(titlecheckbox.checked){
            customers.push(["Album Title"]);
            countCustomers++;
        }
        // if(artistcheckbox.checked){
        //     customers.push(["Artist Name"]);
        //     countCustomers++;
        // }
        // if(lengthcheckbox.checked){
        //     customers.push(["Length of Song"]);
        //     countCustomers++;
        // }
        if(uploaddatecheckbox.checked){
            customers.push(["Creation Date"]);
            countCustomers++;
        }
        // if(sizecheckbox.checked){
        //     customers.push(["Size of File"]);
        //     countCustomers++;
        // }
        if(ratingcheckbox.checked){
            customers.push(["Number of Songs"]);
            countCustomers++;
        }

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < countCustomers; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const Album_titleinfo of get_song_pinformationLT_response.AlbumAinformation) {
            row = table.insertRow(-1);            
            if(titlecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.title;
            }
            // if(artistcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = aname.value;
            // }
            // if(lengthcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.length_seconds;
            // }
            if(uploaddatecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.date_created;
            }
            // if(sizecheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.size;
            // }
            if(ratingcheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.song_count;
            }
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
    else if(quantity.value == "Equal to"){
        get_album_pinformationET({NSongs: nsongs.value })
        .then( (get_playlist_pinformationET_response) => {
                    //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";

        var customers = new Array();
        var countCustomers = 0;

        if(titlecheckbox.checked){
            customers.push(["Album Title"]);
            countCustomers++;
        }
        // if(artistcheckbox.checked){
        //     customers.push(["Artist Name"]);
        //     countCustomers++;
        // }
        // if(lengthcheckbox.checked){
        //     customers.push(["Length of Song"]);
        //     countCustomers++;
        // }
        if(uploaddatecheckbox.checked){
            customers.push(["Creation Date"]);
            countCustomers++;
        }
        // if(sizecheckbox.checked){
        //     customers.push(["Size of File"]);
        //     countCustomers++;
        // }
        if(ratingcheckbox.checked){
            customers.push(["Number of Songs"]);
            countCustomers++;
        }

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < countCustomers; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (const Album_titleinfo of get_playlist_pinformationET_response.AlbumAinformation) {
            row = table.insertRow(-1);            
            if(titlecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.title;
            }
            // if(artistcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = aname.value;
            // }
            // if(lengthcheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.length_seconds;
            // }
            if(uploaddatecheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.date_created;
            }
            // if(sizecheckbox.checked){
            //     var cell = row.insertCell(-1);
            //     cell.innerHTML = Album_titleinfo.size;
            // }
            if(ratingcheckbox.checked){
                var cell = row.insertCell(-1);
                cell.innerHTML = Album_titleinfo.song_count;
            }
        }
 
        playlist_list.innerHTML = "";
        playlist_list.appendChild(table);
        });
    }
});