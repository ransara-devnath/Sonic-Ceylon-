fetch("info.json")
.then(response => response.json())
.then(data => {
    const song = data[0]; // take first song

    document.getElementById("title").textContent = song.title;
    document.getElementById("artist").textContent = song.artist;
    document.getElementById("cover").src = song.image_path;
    document.getElementById("audio").src = song.audio_path;
})
.catch(error => {
    console.error("Error loading song data:", error);
});