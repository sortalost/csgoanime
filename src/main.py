import json
import requests
from flask import Flask, jsonify, render_template, url_for, redirect

app = Flask(__name__)
app.url_map.strict_slashes = False

def getvid():
    resp = requests.get("https://whateverorigin.org/get?url=https://csgoani.me/api/getnewvideo", headers={'Origin': 'https://random.com'}, timeout=5)
    print(resp.content.decode('utf-8'))
    wrapped = resp.json()
    return json.loads(wrapped['contents'])

# @app.route('/click')
# def click():
#     data = getvid()
#     video_url = data['video']
#     video_name = video_url.split('/')[-1].split('.')[0]
#     return redirect(url_for('serve_video', videoname=video_name))

@app.route('/s/<videoname>')
def serve_video(videoname):
    video_url = f"https://csgoani.me/vids/{videoname}.webm"
    return render_template("scroll.html", video_url=video_url, video_name=videoname)

@app.errorhandler(404)
def notfound(e):
    return "not found."

@app.route("/new")
def get_video():
    data = getvid()
    return jsonify({"video": data['video'], "total": data['num_videos']})

@app.route("/")
def scroll():
    data = getvid()
    return render_template("scroll.html", video_url=data['video'])

if __name__ == "__main__":
    app.run()
