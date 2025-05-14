import time
import requests
from flask import Flask, jsonify, render_template, make_response

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route("/")
def csgoanime():
    url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    resp = make_response(render_template("index.html", video_url=url))
    resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    resp.headers['Pragma'] = 'no-cache'
    resp.headers['Expires'] = '0'
    return resp
    # return render_template("index.html", video_url=url)

@app.route("/new")
def get_video():
    video_url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    return jsonify({"video": video_url})

if __name__=="__main__":
    app.run()