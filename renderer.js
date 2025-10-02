// Playlist
const playlist = [
  {
    title: "Candy",
    artist: "NCT Dream",
    src: "assets/audio/NCT DREAM - Candy.mp3", 
    cover: "assets/Candy - Winter Special Mini Album.jpeg"
  },
];

// urutan
let songIndex = 0;
let isPlaying = false;

//Elemen DOM

const audio = document.getElementById("audio-player");
const progress = document.querySelector(".progress");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const songTitle = document.querySelector(".title");

// --- FUNGSI UTAMA ---

// Memuat detail lagu ke player
function loadSong(song) {
  songTitle.innerText = song.title;
  audio.src = song.src;
}

function playSong() {
  isPlaying = true;
  btnPlayPause.classList.add("playing"); // Mengubah gambar ke PAUSE
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  btnPlayPause.classList.remove("playing"); // Mengubah gambar ke PLAY
  audio.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex > playlist.length - 1) {
    songIndex = 0; // Kembali ke lagu pertama
  }
  loadSong(playlist[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = playlist.length - 1; // Kembali ke lagu terakhir
  }
  loadSong(playlist[songIndex]);
  playSong();
}

// --- EVENT LISTENERS ---

// A. Tombol Play/Pause
btnPlayPause.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// B. Navigasi Playlist
btnNext.addEventListener("click", nextSong);
btnPrev.addEventListener("click", prevSong);

// C. Progress Bar Otomatis
// 1. Atur durasi total (max) setelah metadata lagu dimuat
audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
});

// 2. Perbarui posisi buletan saat lagu diputar
audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
});

// 3. Atur posisi lagu saat user menggeser buletan
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// D. Auto Next dan Reset Tombol
audio.addEventListener("ended", () => {
  nextSong(); // Pindah ke lagu berikutnya saat lagu selesai
});

// Muat lagu pertama saat halaman dimuat
loadSong(playlist[songIndex]);
