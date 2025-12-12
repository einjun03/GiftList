const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();
console.log(root)

// find the proof that norman block is in the list 
const name = 'Norman Block';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
//console.log( verifyProof(proof, name, root) ); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
const name2 = 'Ein Block';

//returns -1 if false
const index2 = niceList.findIndex(n => n === name2);
console.log(index2)

//returns [] if name is not in the list
const proof2 = merkleTree.getProof(index2);
console.log(proof2)

//verify proof returns false if proof is wrong or name is not on the list
console.log( verifyProof(proof2, name, root));