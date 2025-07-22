require('dotenv').config();

const express = require('express');
const { getYouTubeStreamUrl } = require('./youtubeExtractor');
const cors = require('cors');
const app = express();
const port = 3000;
const link1 = process.env.LINK1
const link2 = process.env.LINK2;

app.use(cors());

const youtubeLinks = {
  video1: link1,
  video2: link2
};

function mapQualityToFormat(quality) {
  switch (parseInt(quality)) {
    case 144: return '91';
    case 240: return '92';
    case 360: return '93';
    case 480: return '94';
    case 720: return '95';
    case 1080: return '96';
    default: return '93';
  }
}


app.get('/stream/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const quality = req.query.quality;

  if (!youtubeLinks[videoId]) {
    return res.status(404).json({ error: 'Video ID tidak ditemukan' });
  }

  const formatString = mapQualityToFormat(quality);

  try {
    const streamUrl = await getYouTubeStreamUrl(youtubeLinks[videoId], formatString);
    res.json({ streamUrl });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
