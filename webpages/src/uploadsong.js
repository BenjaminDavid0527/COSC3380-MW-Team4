function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }

function getFilePath() {
    //var path = (window.URL || window.webkitURL).createObjectURL(songFile);
    return " ";
}

function getFileLength() {
    var f_duration = 0;
    f_duration = Math.round(songFile.duration);
    return f_duration;
}

const uploadButton = document.querySelector("#uploadbtn");
const songTitle = document.getElementById('songTitle');
const songFile = document.getElementById('songUpload');

uploadButton.addEventListener("click", e => {
    dc = document.cookie;
    const start_idx = dc.indexOf('UserID')
    const end_idx = dc.substr(start_idx).indexOf(";");
    let user_id;

    if (end_idx === -1) {
        user_id = parseInt(dc.substr(start_idx+7));
    }

    else {
        user_id = parseInt(dc.substr(start_idx+7, end_idx));
    }

    var userID = user_id;
    var fileSize = returnFileSize(songFile.size);
    var fileLength = getFileLength();
    var filePath = getFilePath();

    var sql = 'INSERT INTO SONG (title, user_id, album_id, file_path, length_seconds, size) VALUES ("${title}", "${userID}", NULL, "${filePath}", "${fileLength}", "${fileSize}", NOW())';
    db.query(sql, function(err, result) {
        if(err)
          throw err
        console.log('song inserted');
        res.redirect('/');
    });

    window.location.href = "/user";

});
