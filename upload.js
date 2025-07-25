function processLink() {
  const linkInput = document.getElementById('videoLink');
  const status = document.getElementById('status');
  const link = linkInput.value.trim();

  if (!link) {
    status.innerText = "Please paste a video link.";
    return;
  }

  // Cari filecode dari link DoodStream
  const match = link.match(/\/(?:e|d)\/([A-Za-z0-9]+)/);
  if (!match) {
    status.innerText = "Invalid DoodStream link.";
    return;
  }

  const videoId = match[1];
  status.innerText = "Loading player...";
  window.location.href = `player.html?video=${videoId}`;
}
