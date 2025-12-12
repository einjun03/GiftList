const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const root = "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa"

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const data = req.body;
  const name = data.name
  const proof = data.proof

  //console.log(idx)

  const isValid = verifyProof(proof, name, root)
  
  if (isValid) {
    res.send("Name is valid- you are getting a gift!")
  } else {
    res.send("Name was invalid- you are not on the list")
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
