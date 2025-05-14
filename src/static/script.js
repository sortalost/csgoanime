

const vid = document.getElementById('vid');
const initialImage = document.getElementById('initialImage');
const videoInfo = document.getElementById('videoInfo');
const videoName = document.getElementById('videoName');
let videoUrl = "{{ video_url }}";
let unmutedOnce = localStorage.getItem('videoUnmuted') === 'true';

updateVideoInfo(videoUrl);
videoInfo.style.display = 'block';
vid.src = videoUrl;

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

document.getElementById('clickCatcher').addEventListener('click', () => {
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
  vid.play();

  updateVideoInfo(videoUrl);
}

function updateVideoInfo(url) {
  const name = url.split('/').pop().split('.')[0];
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

window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
e.preventDefault();
vid.paused ? vid.play() : vid.pause();
  }
});
