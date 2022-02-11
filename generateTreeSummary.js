const keccak256 = require('keccak256');
const fs = require('fs');
const geneList = require('./NFgenesList.json');

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */

const leaves = [];
const extract = geneList.main.SYMBOL_primary;

const populateLeaves = () => {
    for (i = 0; i < extract.length; i++) {
        let currentLeaf;
        let currentValue;
        currentLeaf = extract[i];
        currentValue = '0x' + keccak256(JSON.stringify(extract[i])).toString('hex');

        // Create an object for each gene containing:
        // gene symbol, keccak256 hash, leaf index
        leaves.push({ "Symbol": currentLeaf, "Hash": currentValue, "Index": i });
    }

    fs.writeFile('MerkleTreeSummary.json', JSON.stringify(leaves), err => {
        if (err) {
            throw err;
        }
        console.log(`\nMerkle Tree Summary saved to 'MerkleTreeSummary.json'`);
    })
}

populateLeaves();

