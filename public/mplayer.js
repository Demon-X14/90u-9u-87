document.addEventListener("DOMContentLoaded", () => {
  const musicPlayer = document.getElementById("musicPlayer");
  const audioPlayer = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const seekBar = document.getElementById("seekBar");
  const volumeControl = document.getElementById("volumeControl");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  let hideTimeout;

  audioPlayer.volume = 0;
  audioPlayer.currentTime = 12.5;

  const fadeDuration = 2000;
  const fadeSteps = 500;
  const fadeStepDuration = fadeDuration / fadeSteps;
  let currentStep = 0;

  function fadeIn() {
    if (currentStep <= fadeSteps) {
      audioPlayer.volume = (currentStep / fadeSteps) * 0.5;
      currentStep++;
      setTimeout(fadeIn, fadeStepDuration);
    } else {
      audioPlayer.volume = 0.5;
    }
  }

  function updatePlayButton() {
    playPauseBtn.innerHTML = audioPlayer.paused
      ? "&#9658;"
      : "&#10074;&#10074;";
  }

  audioPlayer
    .play()
    .then(() => {
      fadeIn();
      updatePlayButton();
    })
    .catch((error) => {
      console.error("Autoplay was prevented:", error);
    });

  audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = progress;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    // Debugging output
    console.log("Duration:", audioPlayer.duration);
    duration.textContent = formatTime(audioPlayer.duration);
  });

  playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.innerHTML = "&#10074;&#10074;";
    } else {
      audioPlayer.pause();
      playPauseBtn.innerHTML = "&#9658;";
    }
  });

  seekBar.addEventListener("input", () => {
    const seekTo = (seekBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTo;
  });

  volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value / 100;
  });

  musicPlayer.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    musicPlayer.classList.add("show");
  });

  musicPlayer.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      musicPlayer.classList.remove("show");
    }, 2000);
  });

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  }
});
