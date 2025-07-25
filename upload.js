async function uploadVideo() {
  const fileInput = document.getElementById('videoFile');
  const status = document.getElementById('status');
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a video file.";
    return;
  }

  status.innerText = "Uploading to Pixeldrain...";

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://pixeldrain.com/api/file", {
    method: "POST",
    headers: {
      "Authorization": "d947be7b-4bf6-44d3-8d8a-36f41857bb4a"
    },
    body: formData
  });

  const data = await res.json();

  if (data.success !== true) {
    status.innerText = "Upload failed: " + (data.message || "Unknown error.");
    return;
  }

  const fileId = data.id;
  const fileUrl = `https://pixeldrain.com/u/${fileId}`;
  const directUrl = `https://pixeldrain.com/api/file/${fileId}?download`;

  status.innerHTML = `
    <h3>Upload Complete!</h3>
    <video controls width="100%" style="max-width:720px;">
      <source src="${directUrl}" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <br><br>
    <input class="link" type="text" value="${fileUrl}" id="videoLink" readonly>
    <button onclick="copyLink()">Copy</button>
    <a href="${directUrl}" download><button>⬇ Download</button></a>
  `;
}

function copyLink() {
  const input = document.getElementById("videoLink");
  input.select();
  document.execCommand("copy");
  alert("Link copied to clipboard!");
}
