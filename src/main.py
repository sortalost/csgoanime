import time
import requests
from flask import Flask, jsonify, render_template, url_for, redirect


app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route('/')
def _root():
    video_url = requests.get("https://csgoani.me/api/getnewvideo")
    print(video_url)
    video_url = video_url.json()['video']
    video_name = video_url.split('/')[-1].split('.')[0]
    return redirect(url_for('serve_video', videoname=video_name))

@app.route('/<videoname>')
def serve_video(videoname):
    video_url = f"https://csgoani.me/vids/{videoname}.webm"
    return render_template("index.html", video_url=video_url, video_name=videoname)

@app.errorhandler(404)
def norfound(e):
    video_url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    video_name = video_url.split('/')[-1].split('.')[0]
    return redirect(url_for('serve_video', videoname=video_name))

@app.route("/new")
def get_video():
    resp = requests.get("https://csgoani.me/api/getnewvideo").json()
    video_url = resp['video']
    total = resp['num_videos']
    return jsonify({"video": video_url,"total":total})

@app.route("/reels")
def reels():
    initial_video = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    return render_template("reels.html", video_url=initial_video)


if __name__=="__main__":
    app.run()
