document.addEventListener("DOMContentLoaded", function () {
  const vid = document.getElementById('vid');
  const initialImage = document.getElementById('initialImage');
  const videoInfo = document.getElementById('videoInfo');
  const videoName = document.getElementById('videoName');
  const clickCatcher = document.getElementById('clickCatcher');
  const videoHistoryContainer = document.getElementById('videoHistory');
  
  let videoUrl = window.initialVideoUrl;
  let unmutedOnce = localStorage.getItem('videoUnmuted') === 'true';
  let videoHistory = [];


  updateVideoInfo(videoUrl);
  videoInfo.style.display = 'block';
  vid.src = videoUrl;
  vid.onerror = () => {
    console.log("Video failed to load. Fetching new one...");
    reloadVideo();
  };
  if (unmutedOnce) {
    initialImage.style.display = 'none';
    vid.style.display = 'block';
    vid.muted = false;
  }

  initialImage.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!unmutedOnce) {
      localStorage.setItem('videoUnmuted', 'true');
      unmutedOnce = true;
    }

    initialImage.style.display = 'none';
    vid.style.display = 'block';
    vid.muted = false;
    vid.play();
  });

  clickCatcher.addEventListener('click', () => {
    reloadVideo();
  });

  videoInfo.addEventListener('click', (e) => {
    e.stopPropagation();
    copyVideoUrl();
  });

  async function reloadVideo() {
    const res = await fetch('/new');
    const data = await res.json();
    videoUrl = data.video;

    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    vid.src = videoUrl;
    const name = videoUrl.split('/').pop().split('.')[0];
    history.replaceState(null, "", "/" + name);
    document.title = "CSGOANIME | " + name;
    vid.play();
    updateVideoInfo(videoUrl);
    addToHistory(videoUrl);
  }

  function updateVideoInfo(url) {
    const name = url.split('/').pop();
    videoName.textContent = name;
  }

  function copyVideoUrl() {
    const textarea = document.createElement("textarea");
    textarea.value = videoUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  function addToHistory(url) {
    if (videoHistory.includes(url)) return;

    videoHistory.push(url);
    const name = url.split('/').pop();

    const item = document.createElement('div');
    item.textContent = name;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      playFromHistory(url);
    });
    videoHistoryContainer.prepend(item);
  }

  function playFromHistory(url) {
    videoUrl = url;

    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    vid.src = videoUrl;

    const name = videoUrl.split('/').pop().split('.')[0];
    history.replaceState(null, "", "/" + name);
    document.title = "CSGO Ani.me - " + name;

    vid.play();
    updateVideoInfo(videoUrl);
  }


  window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      vid.paused ? vid.play() : vid.pause();
    }
  });
});
