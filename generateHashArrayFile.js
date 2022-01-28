const keccak256 = require('keccak256');
const fs = require('fs');
const { MerkleTree } = require('merkletreejs')
const geneList = require('./NFgenesList.json');

const leavesHashArray = [];

/**
 *  Iterate through the json array source data and keccak256
 *  hash each gene object into a hexadecimal string.
 * 
 *  Store this new json array in the 'leavesHashArray' variable
 */
for (i = 0; i < geneList.length; i++) {
    let currentValue;
    currentValue = '0x' + keccak256(JSON.stringify(geneList[i])).toString('hex');
    console.log(currentValue);
    console.log(`Generating keccak256 hash for ${currentValue.Symbol}`);
    leavesHashArray.push(currentValue);
}

console.log(`Hash array is length ${leavesHashArray.length}`);

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */

// Creates a new json file with the array of hashed gene objects
fs.writeFile('MerkleLeaves.json', JSON.stringify(leavesHashArray), err => {
    if (err) {
        throw err;
    }
    console.log('Hashed array saved to MerkleLeaves.json');
});

/**
 *  Creates a new file called 'MerkleTree' that contains
 *  the generated Merkle tree from the 'MerkleLeaves.json' file
 */
const tree = new MerkleTree(leavesHashArray, keccak256);
console.log(tree);

fs.writeFile('MerkleTree.txt', tree.toString(), err => {
    if (err) {
        throw err;
    }
    console.log(`Merkle tree generated. Root hash is ${tree.getHexRoot()}`);
})

/**
 *  Create text file called 'MerkleTreeRoot' that contains
 *  the Merkle tree root hash.
 */
fs.writeFile('MerkleTreeRoot.txt', tree.getHexRoot(), err => {
    if (err) {
        throw err;
    }
    console.log(`Merkle Tree root hash ${tree.getHexRoot()} saved to MerkleTreeRoot.txt`);
});