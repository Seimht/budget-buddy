const fetch = require('node-fetch');

exports.daily = async (_req, res) => {
  try {
    const r = await fetch('https://api.quotable.io/random?tags=wisdom|inspirational');
    const data = await r.json();
    res.json({ content: data.content, author: data.author });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
};
