const keccak256 = require('keccak256');
const fs = require('fs');
const { MerkleTree } = require('merkletreejs')
const geneList = require('./NFgenesList.json');

const leavesHashArray = [];
let layerCount;
let treeDepth;
let leafCount;
let tree;

const generateLeavesHashArray = async () => {
    /**
     *  Iterate through the json array source data and keccak256
     *  hash each gene object into a hexadecimal string.
     * 
     *  Store this new json array in the 'leavesHashArray' variable
     */
    try {
        for (i = 0; i < geneList.length; i++) {
            let currentLeaf;
            let currentValue;
            currentLeaf = geneList[i];
            currentValue = '0x' + keccak256(JSON.stringify(geneList[i])).toString('hex');
            console.log(`Generating keccak256 hash for ${currentLeaf}`);
            leavesHashArray.push(currentValue);
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */


const generateMerkleLeaves = async () => {
    /**
     *  Creates a new json file with the array of hashed gene objects
     */
    try {
        fs.writeFile('MerkleLeaves.json', JSON.stringify(leavesHashArray), err => {
            if (err) {
                throw err;
            }
            console.log('Hashed array saved to MerkleLeaves.json');
        });
    } catch (e) {
        console.log(e);
    }
}

const generateMerkleTree = async () => {
    /**
     *  Creates a new file called 'MerkleTree' that contains
     *  the generated Merkle tree from the 'MerkleLeaves.json' file
     */
    try {
        tree = new MerkleTree(leavesHashArray, keccak256, {sortPairs: true});
        console.log('Tree:\n', tree.toString());
        
        fs.writeFile('MerkleTree.txt', tree.toString(), err => {
            if (err) {
                throw err;
            }
            console.log(`Merkle tree generated.`);
        });
    } catch (e) {
        console.log(e);
    }

    layerCount = tree.getLayerCount();
    treeDepth = tree.getDepth();
    leafCount = tree. getLeafCount();
}

const generateMerkleRoot = async () => {
    /**
     *  Create text file called 'MerkleTreeRoot' that contains
     *  the Merkle tree root hash.
     */
    try {
        fs.writeFile('MerkleTreeRoot.txt', tree.getHexRoot(), err => {
            if (err) {
                throw err;
            }
            console.log(`Merkle Tree root hash is\n ...${tree.getHexRoot()} \n ...Saving to MerkleTreeRoot.txt`);
        });
    } catch (e) {
        console.log(e);
    }
}

const runLogs = async () => {
    // Log some information
    try {
        console.log(`Layer Count: ${layerCount}`);
        console.log(`Leaf Count: ${leafCount}`);
        console.log(`Depth ${treeDepth}`);
    } catch (e) {
        console.log(e);
    }
}

generateLeavesHashArray()
    .then(generateMerkleLeaves()
        .then(generateMerkleTree()
            .then(generateMerkleRoot()
                .then(runLogs()))));
