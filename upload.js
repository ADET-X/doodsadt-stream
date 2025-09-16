document.getElementById('playBtn').addEventListener('click', processLink);
function processLink() {
  const linkInput = document.getElementById('videoId');
  const status = document.getElementById('status');
  const id = linkInput.value.trim();

  if (!id) {
    status.innerText = "Please paste a video ID (contoh: 0T84USm21.mp4).";
    return;
  }

  // basic sanitize: disallow spaces and weird chars
  if (/[\s]/.test(id)) {
    status.innerText = "Invalid ID: tidak boleh ada spasi.";
    return;
  }

  status.innerText = "Loading player...";
  // Redirect to v/ with query id (short form)
  window.location.href = `v/?id=${encodeURIComponent(id)}`;
}
