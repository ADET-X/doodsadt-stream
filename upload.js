async function uploadVideo() {
  const fileInput = document.getElementById('videoFile');
  const status = document.getElementById('status');
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a video file.";
    return;
  }

  status.innerText = "Requesting video slot from Bunny.net...";

  const libraryId = "470784"; // ganti dengan libraryId kamu
  const apiKey = "a48b9bdf-1640-4f44-b6b0ddd65fee-e4f3-4cd4"; // ganti dengan API key kamu

  const createResponse = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'AccessKey': apiKey
    },
    body: JSON.stringify({ title: file.name })
  });

  const createData = await createResponse.json();
  if (!createData.guid) {
    status.innerText = "Failed to create video slot. Check your API Key or Library ID.";
    return;
  }

  const videoGuid = createData.guid;
  status.innerText = "Uploading video to Bunny.net...";

  const uploadResponse = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos/${videoGuid}`, {
    method: 'PUT',
    headers: {
      'AccessKey': apiKey,
      'Content-Type': 'application/octet-stream'
    },
    body: file
  });

  if (!uploadResponse.ok) {
    status.innerText = "Upload failed. Please try again.";
    return;
  }

  status.innerText = "Upload complete! Processing video...";

  let isReady = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const check = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos/${videoGuid}`, {
      headers: { 'AccessKey': apiKey }
    });
    const info = await check.json();
    if (info.status === 4) {
      isReady = true;
      break;
    }
  }

  if (isReady) {
    const videoLink = `player.html?video=${videoGuid}`;
    status.innerHTML = `Video ready! <a href="${videoLink}" target="_blank">Watch Video</a>`;
  } else {
    status.innerText = "Video uploaded but still processing. Check player later.";
  }
}
