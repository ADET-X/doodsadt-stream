
document.getElementById("uploadForm").onsubmit = async function(e) {
  e.preventDefault();
  const file = document.getElementById("fileInput").files[0];
  const formData = new FormData();
  formData.append("api_key", "156828q3ebbp4b3gplnz8d");
  formData.append("file", file);

  const res = await fetch("https://doodapi.com/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  const video = data.result[0];
  document.getElementById("result").innerHTML = `
    <h3>Share your video</h3>
    <img src="${video.single_img}" alt="thumbnail"><br>
    <input type="text" value="https://doodsadt.pro/v/?id=${video.filecode}" readonly><br>
    <button onclick="navigator.clipboard.writeText('https://doodsadt.pro/v/?id=${video.filecode}')">Copy</button>
    <a href="https://doodsadt.pro/v/?id=${video.filecode}" target="_blank">
      <button>Open in Browser</button>
    </a>
  `;
}
