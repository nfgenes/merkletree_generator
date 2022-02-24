const keccak256 = require('keccak256');
const toHex = require('to-hex');
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
 let checkStatus;

const extract = geneList.id_symbol_primary;

async function generateMerkleTree(symbol) {
    try {
        tree = new MerkleTree(extract, keccak256, {sortPairs: true, sortLeaves: true, sort: true, hashLeaves: true});
        root = tree.getHexRoot();
        leaf = symbol;
    } catch (e) {
        console.log(e);
    }
}
/**
 * Using the selected leaf value, lookup the corresponding hash
 * and index from the Merkle Tree Summary json file
*/
async function getLeafHashFromTreeSummary(symbol) {
    try {
        const treeSummary = JSON.parse(fs.readFileSync('./example/MerkleTreeSummary.json'));
        const leafHash = treeSummary.filter(x => x.Leaf === symbol);
        leafHash != 0 ? leafIndex = tree.getLeafIndex(leafHash[0].Hash) : checkStatus = 0;
    } catch (e) {
        console.log(e);
    }
}

const checkValue = () => {
    checkStatus === 0 ? console.log("Error: value does not exist within the list") : getProof(leafIndex);
}

async function getProof(value) {
    try {
        const leaves = tree.getHexLeaves();
        const proof = tree.getHexProof(leaves[value]);
        const leafValueHex = toHex(leaf);
        const leafFilePath = `./example/MerkleProof_${leaf}.json`;
    
        console.log(`Proof generated for ${leaf}`);
        console.log(`Saving proof to ${leafFilePath}`);
        fs.writeFileSync(leafFilePath, JSON.stringify({
            "Leaf Value": leaf,
            "Leaf Hex": leafValueHex,
            "LeafHash": leaves[value],
            "Proof": proof
        }));
    } catch (e) {
        console.log(e);
    }
}

generateMerkleTree("RPAP3")
    // pass in a leaf value to generate a proof
    .then(getLeafHashFromTreeSummary(leaf))
    .then(checkValue)