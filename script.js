```javascript
// ☰ Sidebar Toggle
function toggleMenu() {
  const menu = document.getElementById("sidebarMenu");
  menu.classList.toggle("hidden");
}

// 🔍 Search Functionality
function searchSongs(query) {
  const results = document.getElementById("results");
  const msg = document.getElementById("searchMessage");
  if (!query.trim()) {
    msg.textContent = "";
    results.innerHTML = "";
    return;
}

  msg.textContent = "🔍 Searching...";
  results.innerHTML = "";

  setTimeout(() => {
    fetch("songs.json")
.then((res) => res.json())
.then((songList) => {
        const matches = songList.filter((song) =>
          song.toLowerCase().includes(query.toLowerCase())
);

        if (matches.length === 0) {
          msg.textContent = `❌ No results found for "${query}"`;
} else {
          msg.textContent = `✅ Found ${matches.length} result(s)`;
          results.innerHTML = matches
.map(
              (song) => `
                <div class="result-item" onclick="window.location='song.html?song=${encodeURIComponent(
                  song
)}'">
                  ${song}
                </div>
              `
)
.join("");
}
})
.catch(() => {
        msg.textContent = "⚠️ Error loading songs list.";
});
}, 1500 + Math.random() * 1500);
}

// 🎧 Player Loader (Only runs on song.html)
document.addEventListener("DOMContentLoaded", () => {
  const songPage = window.location.pathname.includes("song.html");
  if (!songPage) return;

  const params = new URLSearchParams(window.location.search);
  const song = params.get("song");

  if (!song) {
    document.querySelector("main").innerHTML = "<p>❌ No song selected.</p>";
    return;
}

  fetch(`database/${song}/info.json`)
.then((res) => {
      if (!res.ok) throw new Error("Not found");
      return res.json();
})
.then((data) => {
      const base = `database/${song}/`;
      document.getElementById("title").textContent = data.title || "Unknown Title";
      document.getElementById("artist").textContent = data.artist || "";
      document.getElementById("date").textContent = data.date
? "Released: " + data.date
: "";
      document.getElementById("preview").src = base + (data.preview || "preview.jpg");
      document.getElementById("player").src = base + (data.mp3 || "song.mp3");
      document.getElementById("downloadBtn").href = base + (data.mp3 || "song.mp3");
})
.catch(() => {
      document.querySelector("main").innerHTML =
        "<p>❌ Song info not found.</p>";
});
});