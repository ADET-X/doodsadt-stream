async function uploadVideo() {
  const fileInput = document.getElementById('videoFile');
  const status = document.getElementById('status');
  const file = fileInput.files[0];
  if (!file) {
    status.innerText = "Please select a video file.";
    return;
  }

  status.innerText = "Uploading video to DoodStream...";
  const formData = new FormData();
  formData.append("file", file);

  try {
    const uploadResponse = await fetch("upload.php", {
      method: "POST",
      body: formData
    });
    const text = await uploadResponse.text();
    console.log("RAW response:", text);
    let uploadData;
    try {
      uploadData = JSON.parse(text);
    } catch (e) {
      status.innerText = "Upload error: response is not valid JSON → " + text;
      return;
    }

    if (!uploadData || !uploadData.result || !uploadData.result[0] || !uploadData.result[0].filecode) {
      status.innerText = "Upload failed: " + JSON.stringify(uploadData);
      return;
    }

    const videoId = uploadData.result[0].filecode;
    status.innerText = "Upload complete! Redirecting to player...";
    window.location.href = `player.html?video=${videoId}`;
  } catch (error) {
    status.innerText = "Upload error: " + error;
  }
}