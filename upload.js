function processLink() {
  const linkInput = document.getElementById('videoLink');
  const status = document.getElementById('status');
  const link = linkInput.value.trim();

  if (!link) {
    status.innerText = "Please paste a video link.";
    return;
  }

  if (!link.startsWith("http")) {
    status.innerText = "Invalid link. Must start with http(s).";
    return;
  }

  status.innerText = "Loading player...";
  // kirim URL langsung ke player.html
  window.location.href = `player.html?url=${encodeURIComponent(link)}`;
}