async function uploadVideo() {
  const fileInput = document.getElementById('videoFile');
  const status = document.getElementById('status');
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Silakan pilih file video terlebih dahulu.";
    return;
  }

  status.innerText = "Mengunggah video ke DoodStream...";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const uploadResponse = await fetch("upload.php", {
      method: "POST",
      body: formData
    });

    const text = await uploadResponse.text();
    let uploadData;
    try {
      uploadData = JSON.parse(text);
    } catch (e) {
      status.innerText = "Gagal memproses respons server: " + text;
      return;
    }

    if (!uploadData || !uploadData.result || !uploadData.result[0] || !uploadData.result[0].filecode) {
      status.innerText = "Upload gagal: " + JSON.stringify(uploadData);
      return;
    }

    const videoId = uploadData.result[0].filecode;
    status.innerText = "Upload berhasil! Mengarahkan ke pemutar...";
    window.location.href = `player.html?video=${videoId}`;
  } catch (error) {
    status.innerText = "Terjadi kesalahan saat upload: " + error.message;
  }
}
