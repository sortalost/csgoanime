import requests
from flask import Flask

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route("/csgo")
def csgoanime():
    url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    return render_template("index.html", video_url=url)

@app.route("/new")
def get_video():
    video_url = requests.get("https://csgoani.me/api/getnewvideo").json()['video']
    return jsonify({"video": video_url})


if __name__=="__main__":
    app.run()