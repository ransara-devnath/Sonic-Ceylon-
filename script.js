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
.then(res => res.json())
.then(songList => {
        const matches = songList.filter(song =>
          song.toLowerCase().includes(query.toLowerCase())
);

        if (matches.length === 0) {
          msg.textContent = `❌ No results found for "${query}"`;
} else {
          msg.textContent = `✅ Found ${matches.length} result(s)`;
          results.innerHTML = matches
.map(song => `
              <div class="result-item" onclick="window.location='song.html?song=${song}'">
                ${song}
              </div>
            `)
.join("");
}
});
}, 1500 + Math.random() * 1500); // Delay up to 3 seconds
}

// ☰ Sidebar Toggle
function toggleMenu() {
  const menu = document.getElementById("sidebarMenu");
  menu.classList.toggle("hidden");
}