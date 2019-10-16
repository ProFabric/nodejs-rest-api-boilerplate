const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ status: true });
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('App is running on 3000'));
