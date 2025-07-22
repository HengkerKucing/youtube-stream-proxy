const { exec } = require('child_process');

/**
 * Ekstrak URL stream dari YouTube via yt-dlp
 * @param {string} youtubeUrl
 * @param {string} quality
 * @returns {Promise<string>}
 */
function getYouTubeStreamUrl(youtubeUrl, quality = 'best') {
  return new Promise((resolve, reject) => {
    const safeQuality = quality.replace(/[^a-zA-Z0-9=<>\[\]]/g, '');
    const cmd = `yt-dlp -f "${safeQuality}" -g "${youtubeUrl}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return reject(`yt-dlp error: ${stderr}`);
      }
      const url = stdout.trim();
      if (!url.startsWith('http')) {
        return reject('Invalid stream URL');
      }
      resolve(url);
    });
  });
}

module.exports = { getYouTubeStreamUrl };
