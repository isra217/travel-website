const express = require('express');
const app = express();

// Your middleware and Firebase logic here...

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working perfectly on Vercel!" });
});

// IMPORTANT: Do not use app.listen(). Export the app.
module.exports = app;