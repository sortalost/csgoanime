import time
import requests
from flask import Flask, jsonify, render_template

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route("/")
def csgoanime():
    url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    return render_template("index.html", video_url=url)

@app.route("/new")
def get_video():
    video_url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    return jsonify({"video": video_url})

@app.route('/force')
def force_refresh():
    video_url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    timestamp = int(time.time())
    return render_template("index.html", video_url=video_url, cache_buster=timestamp)

if __name__=="__main__":
    app.run()