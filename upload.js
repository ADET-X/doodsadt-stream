async function uploadVideo() {
  const fileInput = document.getElementById('videoFile');
  const status = document.getElementById('status');
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "❗ Please select a video file first.";
    return;
  }

  status.innerHTML = "<em>📤 Uploading to Pixeldrain, please wait...</em>";

  const formData = new FormData();
  formData.append("file", file);

  const apiKey = "d947be7b-4bf6-44d3-8d8a-36f41857bb4a";
  const authHeader = "Basic " + btoa(":" + apiKey);

  try {
    const res = await fetch("https://pixeldrain.com/api/file", {
      method: "POST",
      headers: {
        "Authorization": authHeader
      },
      body: formData
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Upload failed:", errorText);
      status.innerHTML = `<span style="color:red;">❌ Upload failed: ${errorText}</span>`;
      return;
    }

    const data = await res.json();
    if (!data || !data.success) {
      status.innerHTML = `<span style="color:red;">❌ Upload failed: ${data.message || "Unknown error"}</span>`;
      return;
    }

    const fileId = data.id;
    const fileUrl = `https://pixeldrain.com/u/${fileId}`;
    const directUrl = `https://pixeldrain.com/api/file/${fileId}?download`;

    status.innerHTML = `
      <h3>✅ Upload Complete!</h3>
      <video controls>
        <source src="${directUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <br><br>
      <input class="link" type="text" value="${fileUrl}" id="videoLink" readonly>
      <button onclick="copyLink()">📋 Copy Link</button>
      <a href="player.html?id=${fileId}"><button>▶ Play</button></a>
      <a href="${directUrl}" download><button>⬇ Download</button></a>
    `;
  } catch (error) {
    console.error("Error:", error);
    status.innerHTML = `<span style="color:red;">❌ Error: ${error.message}</span>`;
  }
}

function copyLink() {
  const input = document.getElementById("videoLink");
  input.select();
  document.execCommand("copy");
  alert("✅ Link copied to clipboard!");
}
