function processLink() {
  const linkInput = document.getElementById('videoId');
  const status = document.getElementById('status');
  const id = linkInput.value.trim();

  if (!id) {
    status.innerText = "Please paste a video ID.";
    return;
  }

  status.innerText = "Loading player...";
  // Redirect ke /v/ dengan query id
  window.location.href = `v/?id=${encodeURIComponent(id)}`;
}
