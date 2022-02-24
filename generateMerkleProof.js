const keccak256 = require('keccak256');
const fs = require('fs');
const { MerkleTree } = require('merkletreejs')
const geneList = require('./data/NFgenesList.json');

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */

 let tree;
 let root;
 let leaf
 let leafIndex;

const extract = geneList.id_symbol_primary;

async function generateMerkleTree() {
    try {
        tree = new MerkleTree(extract, keccak256, {sortPairs: true, sortLeaves: true, sort: true, hashLeaves: true});
        root = tree.getHexRoot();
    } catch (e) {
        console.log(e);
    }
}
/**
 * Using the selected leaf value, lookup the corresponding hash
 * and index from the Merkle Tree Summary json file
*/
async function getLeafHashFromTreeSummary(leafValue) {
    leaf = leafValue;
    const treeSummary = JSON.parse(fs.readFileSync('./example/MerkleTreeSummary.json'));
    const LeafHash = treeSummary.filter(x => x.Leaf === leafValue);
    leafIndex = tree.getLeafIndex(LeafHash[0].Hash);
}

async function getProof(value) {
    const leaves = tree.getHexLeaves();
    const proof = tree.getHexProof(leaves[value]);
    const leafFilePath = `./example/MerkleProof_${leaf}.json`;

    console.log(`Proof generated for ${leaf}`);
    console.log(`Saving proof to ${leafFilePath}`);
    fs.writeFileSync(leafFilePath, JSON.stringify({
        "Leaf Value": leaf,
        "LeafHash": leaves[value],
        "Proof": proof
    }));
}

generateMerkleTree()
    // pass in a leaf value to generate a proof
    .then(getLeafHashFromTreeSummary("HAX1"))
    .then(getProof(leafIndex))