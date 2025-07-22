import sys
import yt_dlp

url = sys.argv[1]

ydl_opts = {
    'quiet': True,
    'forceurl': True,
    'skip_download': True,
    'format': 'best',
    'noplaylist': True,
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(url, download=False)
    print(info['url'])
