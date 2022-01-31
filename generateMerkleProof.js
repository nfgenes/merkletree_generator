const keccak256 = require('keccak256');
const fs = require('fs');
const { MerkleTree } = require('merkletreejs')
const geneList = require('./NFgenesList.json');
const TreeSummary = require('./MerkleTreeSummary.json');

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */

const leavesHashArray = [];
let tree;

const populateLeavesHashArray = () => {
    for (i = 0; i < geneList.length; i++) {
        let currentLeaf;
        let currentValue;
        currentLeaf = geneList[i];
        currentValue = '0x' + keccak256(JSON.stringify(geneList[i])).toString('hex');
        console.log(`Generating keccak256 hash for ${currentLeaf}`);
        leavesHashArray.push(currentValue);
    }
    console.log(`Hash array is length ${leavesHashArray.length}`);
}

const generateTree = () => {
    populateLeavesHashArray();
    tree = new MerkleTree(leavesHashArray, keccak256, {sortPairs: true});
    console.log(`Merkle Tree:\n ${tree}`);
}

const generateProof = (arrayIndex) => {
    generateTree();
    const proof = tree.getHexProof(leavesHashArray, arrayIndex);

    const rootHash = tree.getHexRoot();
    console.log(`Generating Merkle Tree Proof...`);
    console.log(`Root Hash: ${rootHash}`);
    console.log(`Selected value: ${leavesHashArray[arrayIndex]}`);
    console.log(`Proof Array:`);
    console.log(proof);

    fs.writeFile('MerkleTreeProof.txt', JSON.stringify(TreeSummary[arrayIndex].Hash) + ',' + JSON.stringify(proof), err => {
        if (err) {
            throw err;
        }
    })
}

generateProof(9);