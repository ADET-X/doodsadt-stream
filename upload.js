async function uploadVideo() {
  const fileInput = document.getElementById('videoFile');
  const status = document.getElementById('status');
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a video file.";
    return;
  }

  status.innerText = "Requesting upload server from DoodStream...";

  const apiKey = "156828q3ebbp4b3gplnz8d";

  // Step 1: Get upload server from DoodStream
  const serverRes = await fetch(`https://doodapi.co/api/upload/server?key=${apiKey}`);
  const serverData = await serverRes.json();
  if (!serverData.result) {
    status.innerText = "Failed to get upload server.";
    return;
  }

  const uploadUrl = serverData.result + '?' + apiKey;

  // Step 2: Upload the file
  status.innerText = "Uploading to DoodStream...";
  const formData = new FormData();
  formData.append("api_key", apiKey);
  formData.append("file", file);

  const uploadRes = await fetch(uploadUrl, {
    method: "POST",
    body: formData
  });

  const uploadData = await uploadRes.json();
  if (!uploadData.result || !uploadData.result[0]) {
    status.innerText = "Upload failed.";
    return;
  }

  const video = uploadData.result[0];
  const videoCode = video.filecode;
  const splashImg = video.splash_img || video.single_img;
  const link = `https://doodsadt.pro/v/?id=${videoCode}`;

  status.innerHTML = `
    <h3>Upload Complete!</h3>
    <img src="${splashImg}" alt="Thumbnail">
    <input class="link" type="text" value="${link}" id="videoLink" readonly>
    <button onclick="copyLink()">Copy</button>
    <a href="${link}" target="_blank"><button>Open in Browser</button></a>
  `;
}

function copyLink() {
  const input = document.getElementById("videoLink");
  input.select();
  document.execCommand("copy");
  alert("Link copied to clipboard!");
}
