function searchSongs(query) {
  const results = document.getElementById("results");
  const msg = document.getElementById("searchMessage");
  if (!query.trim()) {
    msg.innerHTML = "";
    results.innerHTML = "";
    return;
}
  msg.textContent = "🔍 Searching...";
  results.innerHTML = "";

  setTimeout(() => {
    fetch("songs.json").then(r => r.json()).then(list => {
      const matches = list.filter(song =>
        song.toLowerCase().includes(query.toLowerCase())
);
      if (matches.length === 0) {
        msg.innerHTML = `❌ No results found for "${query}"`;
} else {
        msg.innerHTML = `✅ Found ${matches.length} song(s)`;
        results.innerHTML = matches.map(s =>
          `<div class="result-item" onclick="window.location='song.html?song=${s}'">${s}</div>`
).join('');
}
});
}, 2000 + Math.random() * 1500);
}