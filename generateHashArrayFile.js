const keccak256 = require('keccak256');
const fs = require('fs');
const { MerkleTree } = require('merkletreejs')
const geneList = require('./NFgenesList.json');

const leavesHashArray = [];
let tree;

const generateLeavesHashArray = async () => {
    /**
     *  Iterate through the json array source data and keccak256
     *  hash each gene object into a hexadecimal string.
     * 
     *  Store this new json array in the 'leavesHashArray' variable
     */

    // Identify primary list array within data set
    const extract = geneList.main.SYMBOL_primary;

    try {
        console.log(`Generating a keccak256 hash for each gene...`);
        for (i = 0; i < extract.length; i++) {
            let currentLeaf;
            let currentValue;
            currentLeaf = extract[i];
            currentValue = '0x' + keccak256(JSON.stringify(extract[i])).toString('hex');
            // For a short list, you can log it out, but not recommended for large lists
            // console.log(`Generating keccak256 hash for ${currentLeaf}`);
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
        console.log('     Saving hashed array to MerkleLeaves.json');
        fs.writeFile('MerkleLeaves.json', JSON.stringify(leavesHashArray), err => {
            if (err) {
                throw err;
            }
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
        console.log(`\nGenerating a Merkle Tree...`);
        tree = new MerkleTree(leavesHashArray, keccak256, {sortPairs: true});
        // For a short list, you can log it out, but not recommended for large lists
        // console.log('Tree:\n', tree.toString());
        
        fs.writeFile('MerkleTree.txt', tree.toString(), err => {
            if (err) {
                throw err;
            }
            console.log(`     Merkle tree generated.`);
            console.log(`     Root hash is ${tree.getHexRoot()} \n     Saving to MerkleTreeRoot.txt`);
            console.log(`\n     Tree Summary:\n          Leaf Count: ${tree.getLeafCount()}\n          Layer Count: ${tree.getLayerCount()}\n          Tree Depth: ${tree.getDepth()}`);
        });
    } catch (e) {
        console.log(e);
    }
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
        });
    } catch (e) {
        console.log(e);
    }
}

generateLeavesHashArray()
    .then(generateMerkleLeaves()
        .then(generateMerkleTree()
            .then(generateMerkleRoot())));
