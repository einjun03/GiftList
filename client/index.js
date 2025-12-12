const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main(name) {
  //find idx of name on our list to get its proof
  const idx = niceList.findIndex(n => n === name);

  //construct the proof from the merkle tree that we constructed
  const proof = merkleTree.getProof(idx);

  // send the name and the proof to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift });
}

//process.argv[0]: path to node
// process.argv[1]: path to script 
// process.argv[2]: first argument you pass in (cmd line arg)
//extract args from idx 2 to end

let name = ""
if (process.argv.length == 4) {
  name = process.argv.slice(2).join(' ');
} else {
  console.log("Please pass in a full name: First Last");
}

main(name);