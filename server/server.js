const http = require('http');
const fs = require('fs');
const mysql = require('./node_modules/mysql');

const { hostname, port, pages_path } = require('./src/contants');

//Create connection to our database
const connection = mysql.createConnection({
  host     : 'cosc3380-mw-team4.ce2wtehy81sy.us-east-1.rds.amazonaws.com',
  port     : '3380',
  user     : 'admin',
  password : 'Team4!!!',
  database : 'Team4_Music_Site'
});
connection.connect();

function construct_update_rating(data) {
    // data: {UserID, SongID, Rating, WasRated}
    let query = `UPDATE RATING SET rating=${data.Rating}
            WHERE (user_id = ${data.UserID} AND song_id = ${data.SongID})`
    return query;
}

function construct_insert_rating(data) {
    // data: {UserID, SongID, Rating, WasRated}
    let query = `INSERT INTO RATING (user_id, song_id, rating) VALUE (
        ${data.UserID}, ${data.SongID}, ${data.Rating}
    )`
    return query;
}

async function handle_song_rating_update(song_id, response) {
    connection.query(`SELECT rating FROM SONG WHERE (id = ${song_id})`, (error, results) => {
        if (error) {
            console.log(error);
            response.writeHead(500);
            response.end();
            throw error;
        }
        response.writeHead(200);
        response.write(JSON.stringify({Modified: true, NewRating: results[0].rating}));
        response.end();
    });
}

async function handle_posts_requests(request, response) {
    if (request.url === '/requests/login') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const user_info = JSON.parse(buffers.toString());
        const query = `SELECT id FROM USER WHERE (name="${user_info.Username}" AND password="${user_info.Password}")`
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            if (Object.keys(results).length === 0) { // Username/Password combo not found in database
                response.writeHead(200);
                response.write(JSON.stringify({'Accepted': false}));
                response.end();
            }
            else {
                response.writeHead(200);
                response.write(JSON.stringify({'Accepted': true, 'UserID': results['0'].id}));
                response.end();
            }
        });
    }
    
    else if (request.url.substr(0,15) === '/requests/songs') {
        if (request.url === '/requests/songs') {
            const buffers = [];
            for await (const chunk of request) {
                buffers.push(chunk);
            }
            const user_id = JSON.parse(buffers.toString());
            const first_query = 'SELECT id, title, rating FROM SONG';
            const second_query = `SELECT song_id, rating FROM RATING WHERE (user_id = ${user_id.UserID})`
            connection.query(first_query, (error, first_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                connection.query(second_query, (error, second_results) => {
                    if (error) {
                        console.log(error);
                        response.writeHead(500);
                        response.end();
                        throw error;
                    }
                    else {
                        const rows = {Songs: [], Ratings: []};
                        for (const row of first_results) {
                            rows.Songs.push(row);
                        }
                        for (const row of second_results) {
                            rows.Ratings.push(row);
                        }
                        response.writeHead(200);
                        response.write(JSON.stringify(rows));
                        response.end();
                    }
                });

            });
        }
    }
    else if (request.url.substr(0,20) === '/requests/user_songs') {
        if (request.url === '/requests/user_songs') {
            const buffers = [];
            for await (const chunk of request) {
                buffers.push(chunk);
            }
            const user_id = JSON.parse(buffers.toString());
            const first_query = `SELECT id, title, rating FROM SONG WHERE (user_id = ${user_id.UserID})`;
            const second_query = `SELECT song_id, rating FROM RATING WHERE (user_id = ${user_id.UserID})`
            connection.query(first_query, (error, first_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                connection.query(second_query, (error, second_results) => {
                    if (error) {
                        console.log(error);
                        response.writeHead(500);
                        response.end();
                        throw error;
                    }
                    else {
                        const rows = {Songs: [], Ratings: []};
                        for (const row of first_results) {
                            rows.Songs.push(row);
                        }
                        for (const row of second_results) {
                            rows.Ratings.push(row);
                        }
                        response.writeHead(200);
                        response.write(JSON.stringify(rows));
                        response.end();
                    }
                });

            });
        }
    }
    else if (request.url.substr(0,22) === '/requests/upload_songs') {
        if (request.url === '/requests/upload_songs') {
            const buffers = [];
            for await (const chunk of request) {
                buffers.push(chunk);
            }
            const upload_song_info = JSON.parse(buffers.toString());
            const upload_songs_query = `INSERT INTO SONG (title, user_id, file_path, length_seconds, size) VALUES ("${upload_song_info.Title}", ${upload_song_info.UserID}, "NULL", "260", "200")`

            connection.query(upload_songs_query, (error, upload_songs_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                
                const createResponse = {Changed: upload_songs_results.affectedRows};

                response.writeHead(200);
                response.write(JSON.stringify(createResponse));
                response.end();          
                }
            );
        }
    }
    else if (request.url.substr(0,25) === '/requests/create_playlist') {
        if (request.url === '/requests/create_playlist') {
            const buffers = [];
            for await (const chunk of request) {
                buffers.push(chunk);
            }
            const create_playlist_info = JSON.parse(buffers.toString());
            const create_playlist_query = `INSERT INTO PLAYLIST (user_id, title) VALUES ( ${create_playlist_info.UserID}, "${create_playlist_info.Title}" )`

            connection.query(create_playlist_query, (error, create_playlist_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                
                const createResponse = {Changed: create_playlist_results.affectedRows};

                response.writeHead(200);
                response.write(JSON.stringify(createResponse));
                response.end();          
                }
            );
        }
    }
    else if (request.url.substr(0,25) === '/requests/delete_playlist') {
        if (request.url === '/requests/delete_playlist') {
            const buffers = [];
            for await (const chunk of request) {
                buffers.push(chunk);
            }
            const delete_playlist_info = JSON.parse(buffers.toString());
            const delete_playlist_query = `DELETE FROM PLAYLIST WHERE (title = "${delete_playlist_info.Title}" AND user_id = ${delete_playlist_info.UserID})`

            connection.query(delete_playlist_query, (error, delete_playlist_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                
                const createResponse = {Changed: delete_playlist_results.affectedRows};

                response.writeHead(200);
                response.write(JSON.stringify(createResponse));
                response.end();          
                }
            );
        }
    }
    else if (request.url.substr(0,18) === '/requests/playlist') {
        if (request.url === '/requests/playlist') {
            const buffers = [];
            for await (const chunk of request) {
                buffers.push(chunk);
            }
            const output_playlist_info = JSON.parse(buffers.toString());
            const output_playlist_query = `SELECT title FROM PLAYLIST WHERE (user_id = ${output_playlist_info.UserID})`

            connection.query(output_playlist_query, (error, output_playlist_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                const rowsPlaylist = {Info: []}
                for (const rowPlaylist of output_playlist_results) {
                    rowsPlaylist.Info.push(rowPlaylist);
                }
                response.writeHead(200);
                response.write(JSON.stringify(rowsPlaylist));
                response.end();          
            }
        );
    }
}

else if (request.url.substr(0,35) === '/requests/get_playlist_ainformation') {
    if (request.url === '/requests/get_playlist_ainformation') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const ainformation = JSON.parse(buffers.toString());
        const ainformation_query = `SELECT title, date_created, song_count FROM PLAYLIST WHERE(user_id = (SELECT id FROM USER WHERE name = "${ainformation.ArtistName}"))`
        connection.query(ainformation_query, (error, ainformation_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {Ainformation: []};
            for (const row of ainformation_results) {
                rows.Ainformation.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}
else if (request.url.substr(0,40) === '/requests/get_playlist_ptitleinformation') {
    if (request.url === '/requests/get_playlist_ptitleinformation') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const ptitleinformation = JSON.parse(buffers.toString());
        const ptitleinformation_query = `SELECT title, date_created, song_count FROM PLAYLIST WHERE( title = "${ptitleinformation.PlaylistName}")`
        connection.query(ptitleinformation_query, (error, ptitleinformation_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {Ptitleinformation: []};
            for (const row of ptitleinformation_results) {
                rows.Ptitleinformation.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}
else if (request.url.substr(0,35) === '/requests/get_playlist_sinformation') {
    if (request.url === '/requests/get_playlist_sinformation') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const sinformation = JSON.parse(buffers.toString());
        const sinformation_query = `SELECT title, date_created, song_count FROM PLAYLIST WHERE(id = (SELECT playlist_id FROM SONG_PLAYLIST WHERE song_id = (SELECT id FROM SONG WHERE title = "${sinformation.SongTitle}")))`
        connection.query(sinformation_query, (error, sinformation_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {Sinformation: []};
            for (const row of sinformation_results) {
                rows.Sinformation.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}
else if (request.url.substr(0,37) === '/requests/get_playlist_pinformationMT') {
    if (request.url === '/requests/get_playlist_pinformationMT') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const pinformationMT = JSON.parse(buffers.toString());
        const pinformationMT_query = `SELECT title, date_created, song_count FROM PLAYLIST WHERE( song_count > ${pinformationMT.NSongs})`
        connection.query(pinformationMT_query, (error, pinformationMT_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {PinformationMT: []};
            for (const row of pinformationMT_results) {
                rows.PinformationMT.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}
else if (request.url.substr(0,37) === '/requests/get_playlist_pinformationLT') {
    if (request.url === '/requests/get_playlist_pinformationLT') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const pinformationLT = JSON.parse(buffers.toString());
        const pinformationLT_query = `SELECT title, date_created, song_count FROM PLAYLIST WHERE( song_count < ${pinformationLT.NSongs})`
        connection.query(pinformationLT_query, (error, pinformationLT_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {PinformationLT: []};
            for (const row of pinformationLT_results) {
                rows.PinformationLT.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}
else if (request.url.substr(0,37) === '/requests/get_playlist_pinformationET') {
    if (request.url === '/requests/get_playlist_pinformationET') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const pinformationET = JSON.parse(buffers.toString());
        const pinformationET_query = `SELECT title, date_created, song_count FROM PLAYLIST WHERE( song_count = ${pinformationET.NSongs})`
        connection.query(pinformationET_query, (error, pinformationET_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {PinformationET: []};
            for (const row of pinformationET_results) {
                rows.PinformationET.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}
else if (request.url.substr(0,23) === '/requests/get_user_name') {
    if (request.url === '/requests/get_user_name') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const get_user_name_info = JSON.parse(buffers.toString());
        const get_user_name_query = `SELECT name FROM USER WHERE( id = ${get_user_name_info.UserID})`
        connection.query(get_user_name_query, (error, get_user_name_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {Un: []};
            for (const row of get_user_name_results) {
                rows.Un.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
}

else if (request.url.substr(0,30) === '/requests/insert_song_playlist') {
    if (request.url === '/requests/insert_song_playlist') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const insert_song_playlist_info = JSON.parse(buffers.toString());
        //const insert_song_playlist_query = `INSERT INTO SONG_PLAYLIST (song_id, playlist_id) VALUE ( ${insert_song_playlist_info.SongID}, (SELECT id FROM PLAYLIST WHERE ( title = "${insert_song_playlist_info.Title}")))`
        
        connection.query(`SELECT id FROM PLAYLIST WHERE ( title = "${insert_song_playlist_info.Title}")`, (error, select_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const res = JSON.stringify(select_results);
            const insert_song_playlist_query = `INSERT INTO SONG_PLAYLIST (song_id, playlist_id) VALUE ( ${insert_song_playlist_info.SongID}, ${select_results[0].id})`

            connection.query(insert_song_playlist_query, (error, create_playlist_results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end();
                    throw error;
                }
                
                const createResponse = {Changed: create_playlist_results.affectedRows};
    
                response.writeHead(200);
                response.write(JSON.stringify(createResponse));
                response.end();          
                }
            );
        });


    }
}
else if (request.url.substr(0,30) === '/requests/delete_song_playlist') {
    if (request.url === '/requests/delete_song_playlist') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const insert_song_playlist_info = JSON.parse(buffers.toString());
        const insert_song_playlist_query = `DELETE FROM SONG_PLAYLIST WHERE ( song_id = ${insert_song_playlist_info.SongID} AND playlist_id = (SELECT id FROM PLAYLIST WHERE(title = "${insert_song_playlist_info.Title}" AND user_id = ${insert_song_playlist_info.UserID})))`

        connection.query(insert_song_playlist_query, (error, create_playlist_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            
            const createResponse = {Changed: create_playlist_results.affectedRows};

            response.writeHead(200);
            response.write(JSON.stringify(createResponse));
            response.end();          
            }
        );
    }
}
else if (request.url.substr(0,22) === '/requests/delete_songs') {
    if (request.url === '/requests/delete_songs') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const delete_song_info = JSON.parse(buffers.toString());
        const delete_song_query = `DELETE FROM SONG WHERE (title = "${delete_song_info.Title}" AND user_id = ${delete_song_info.UserID})`

        connection.query(delete_song_query, (error, delete_songs_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            
            const createResponse = {Changed: delete_songs_results.affectedRows};

            response.writeHead(200);
            response.write(JSON.stringify(createResponse));
            response.end();          
            }
        );
    }
}
else if (request.url.substr(0,29) === '/requests/get_playlists_songs') {
    if (request.url === '/requests/get_playlists_songs') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const output_playlist_songs_info = JSON.parse(buffers.toString());
        const output_playlist_songs_query = `SELECT title, rating, id FROM SONG WHERE (id IN (SELECT song_id FROM SONG_PLAYLIST WHERE (playlist_id = ( SELECT id FROM PLAYLIST WHERE (title = "${output_playlist_songs_info.Title}")))))`

        connection.query(output_playlist_songs_query, (error, output_playlist_songs_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {SongInformation: []};
            for (const row of output_playlist_songs_results) {
                rows.SongInformation.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        }
    );
    }
}
else if (request.url.substr(0,33) === '/requests/get_non_playlists_songs') {
    if (request.url === '/requests/get_non_playlists_songs') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const output_playlist_songs_info = JSON.parse(buffers.toString());
        const output_playlist_songs_query = `SELECT title, rating, id FROM SONG WHERE (id NOT IN (SELECT song_id FROM SONG_PLAYLIST WHERE (playlist_id = ( SELECT id FROM PLAYLIST WHERE (title = "${output_playlist_songs_info.Title}")))))`

        connection.query(output_playlist_songs_query, (error, output_playlist_songs_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rows = {SongInformation: []};
            for (const row of output_playlist_songs_results) {
                rows.SongInformation.push(row);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
        }
    );
    }
}
else if (request.url.substr(0,15) === '/requests/albums') {
    if (request.url === '/requests/albums') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const output_album_info = JSON.parse(buffers.toString());
        const output_album_query = `SELECT id, title FROM ALBUM WHERE (user_id = ${output_album_info.UserID})`

        connection.query(output_album_query, (error, output_album_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rowsAlbums = {Info: []}
            for (const rowAlbums of output_album_results) {
                rowsAlbums.Info.push(rowAlbums);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rowsAlbums));
            response.end();          
        }
    );
}
}
else if (request.url.substr(0,24) === '/requests/get_album_songs') {
    if (request.url === '/requests/get_album_songs') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const output_song_info = JSON.parse(buffers.toString());
        const output_song_query = `SELECT id, title FROM SONG WHERE (ALBUM.id = ${output_song_info.album_id})`

        connection.query(output_song_query, (error, output_song_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            const rowsSongs = {Info: []}
            for (const rowSongs of output_song_results) {
                rowsSongs.Info.push(rowSongs);
            }
            response.writeHead(200);
            response.write(JSON.stringify(rowsSongs));
            response.end();          
        }
    );
}
}
else if (request.url.substr(0,25) === '/requests/createalbum') {
    if (request.url === '/requests/createalbum') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const create_album_info = JSON.parse(buffers.toString());
        const create_album_query = `INSERT INTO ALBUM (user_id, title) VALUES ( ${create_album_info.UserID}, "${create_album_info.Title}" )`

        connection.query(create_album_query, (error, create_album_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            
            const createResponse = {Changed: create_album_results.affectedRows};

            response.writeHead(200);
            response.write(JSON.stringify(createResponse));
            response.end();          
            }
        );
    }
}
else if (request.url.substr(0,25) === '/requests/deletealbum') {
    if (request.url === '/requests/deletealbum') {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const delete_album_info = JSON.parse(buffers.toString());
        const delete_album_query = `DELETE FROM ALBUM WHERE (id = ${delete_album_info.Id} AND user_id = ${delete_album_info.UserID})`

        connection.query(delete_album_query, (error, delete_album_results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            
            const createResponse = {Changed: delete_album_results.affectedRows};

            response.writeHead(200);
            response.write(JSON.stringify(createResponse));
            response.end();          
            }
        );
    }
}
    else if (request.url.substr(0,16) === '/requests/rating') {
        const buffers = [];    
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        rating_info = JSON.parse(buffers.toString());
        var query;
        if (rating_info.WasRated) {
            query = construct_update_rating(rating_info);
        }
        else {
            query = construct_insert_rating(rating_info);
        }
        connection.query(query, async (error, results) => {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end();
                throw error;
            }
            else {
                if (results.affectedRows != 0 || results.changedRows != 0) {
                    await handle_song_rating_update(rating_info.SongID, response);
                    return;
                }
                const body = {Modified: false};
                
                response.writeHead(200);
                response.write(JSON.stringify(body));
                response.end();
            }
        });
    }
    else if (request.url === "/requests/signup") {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const user_info = JSON.parse(buffers.toString());
        const exists_query = `SELECT id FROM USER WHERE name="${user_info.Username}";`
        connection.query(exists_query, (error, results) => {
            if (error) {
                console.log(error);
                throw error;
            }
            if (Object.keys(results).length > 0) { // Username already exists
                response.writeHead(409);
                response.write(JSON.stringify({'Accepted': false}));
                response.end();
            } else {
                const query = `INSERT INTO USER (name, password) VALUES("${user_info.Username}", "${user_info.Password}");`;
                connection.query(query, (error, results) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }

                    response.writeHead(200);
                    response.write(JSON.stringify({'Accepted': true, 'UserID': results.insertId}));
                    response.end();
                });
            }
        });
    }
    else {
        const buffers = [];    
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        console.log(JSON.parse(buffers.toString()));
        response.write(JSON.stringify({'Accepted': false}))
        response.end();
    }
}

// Main function body of our server. All requests to our webpage are routed
// through this function.
async function server_handler(request, response) {
    console.log(request.url);
    if (request.url === '/' ) { // Default to index page?
        file_path = pages_path + '/html/register.html';
        content_type = 'text/html';
    }
    else if (request.url === '/songs') {
        file_path = pages_path + '/html/songs.html'
        content_type = 'text/html';
    }
    else if (request.url === '/create_playlist' || request.url === '/create_playlist/') {
        file_path = pages_path + '/html/create_playlist.html'
        content_type = 'text/html';
    }
    else if (request.url === '/playlist' || request.url === '/playlist/') {
        file_path = pages_path + '/html/playlist.html'
        content_type = 'text/html';
    }
    else if (request.url === '/reports' || request.url === '/reports/') {
        file_path = pages_path + '/html/reports.html'
        content_type = 'text/html';
    }
    else if (request.url === '/albums' || request.url === '/albums/') {
        file_path = pages_path + '/html/albums.html'
        content_type = 'text/html';
    }
    else if (request.url === '/uploads' || request.url === '/uploads/') {
        file_path = pages_path + '/html/uploads.html'
        content_type = 'text/html';
    }
    else if (request.url.substr(0,9) === '/requests') {
        handle_posts_requests(request, response);
        return;
    }
    else if (request.url === '/user' || request.url === '/user?' ) {
        file_path = pages_path + '/html/user.html';
        content_type = 'text/html';
    }
    else { // Likely a request for a specific resource
        const extension = request.url.split('.').pop(); // gives us the last string preceeded by ".", should be file extension
        file_path = '.' + request.url;
        if (extension === 'css') {
            content_type = 'text/css';
        }
        else if (extension === 'js') {
            content_type = 'text/javascript';
        }
        else if (extension === 'png') {
            content_type = 'image/png';  
        }
        else if (extension === 'json') {
            content_type = 'application/json'
        }
        else if (extension === 'ico') {
            content_type = 'image/x-icon'
            file_path = pages_path + '/data/' + request.url;
        }
        else {
            content_type = 'text/plain';
        }
    }
    fs.readFile(file_path, function (err, content) {
        if (err) {
            console.log(err);
            response.writeHead(404);
            response.end();
            return;
        }
        response.writeHead(200, {"Content-Type": content_type});
        response.write(content);
        response.end();
    });
}

http.createServer(server_handler).listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
});

// connection.query('SELECT * FROM `SONG`', function (error, results) {
//     if (error){                     // error will be an Error if one occurred during the query
//         console.log('Error');
//         throw error;
//     }
//     console.log(results);    // results will contain the results of the query
//   });

// connection.end();
