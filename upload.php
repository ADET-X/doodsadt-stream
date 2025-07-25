<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$apiKey = "156828ewsv8ijt78ja815s";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file']['tmp_name'];

    $serverUrl = "https://doodapi.co/api/upload/server?key={$apiKey}";
    $serverDataRaw = file_get_contents($serverUrl);

    if ($serverDataRaw === false) {
        echo json_encode(["error" => "Tidak bisa terhubung ke server DoodStream"]);
        exit;
    }

    $serverData = json_decode($serverDataRaw, true);
    if (!$serverData || !isset($serverData['result'])) {
        echo json_encode([
            "error" => "Gagal mengambil server upload",
            "response" => $serverDataRaw
        ]);
        exit;
    }

    $uploadUrl = $serverData['result'];

    $cfile = new CURLFile($file, $_FILES['file']['type'], $_FILES['file']['name']);
    $postFields = [
        'api_key' => $apiKey,
        'file' => $cfile
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uploadUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(["error" => "cURL error: " . curl_error($ch)]);
        curl_close($ch);
        exit;
    }
    curl_close($ch);

    if (!$response) {
        echo json_encode(["error" => "Upload gagal, respon kosong dari DoodStream"]);
        exit;
    }

    echo $response;
} else {
    echo json_encode(["error" => "Tidak ada file diupload"]);
}
?>