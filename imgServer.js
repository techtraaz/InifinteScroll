
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/', (req,res) => res.send('hello world'))



app.get('/api/getImages', (req, res) => {
  const urls = [];
  for (let i = 10; i <= 100; i++) {
    urls.push(`https://picsum.photos/id/${i}/1200/600`);
  }
  //please note that this will send all urls at once 
  //didnt used any oprimization to this route yet , will update sooner
  res.json(urls); 

});

app.listen(3000 , () => console.log('http://localhost:3000'))