const keccak256 = require('keccak256');
const fs = require('fs');
const geneList = require('./NFgenesList.json');

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */

const leaves = [];

const populateLeaves = () => {
    for (i = 0; i < geneList.length; i++) {
        let currentLeaf;
        let currentValue;
        currentLeaf = geneList[i];
        currentValue = '0x' + keccak256(JSON.stringify(geneList[i])).toString('hex');
        console.log(`Generating keccak256 hash for ${currentLeaf}`);

        // Create an object for each gene containing:
        // gene symbol, keccak256 hash, leaf index
        leaves.push({ "Symbol": currentLeaf, "Hash": currentValue, "Index": i });
    }
    console.log(`Hash array is length ${leaves.length}`);

    fs.writeFile('MerkleTreeSummary.json', JSON.stringify(leaves), err => {
        if (err) {
            throw err;
        }
        console.log(`Generating Merkle Tree summary...`);
        console.log(leaves);
    })
}

populateLeaves();

