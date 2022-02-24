const keccak256 = require('keccak256');
const fs = require('fs');
const { MerkleTree } = require('merkletreejs')
const geneList = require('./data/NFgenesList.json');

const geneSymbols = [];
const leafValues = [];
let tree;

/**
 *  TO DO: Add a check for a generated tree that is unbalanced. At a minimum
 *  give a notice of unbalaned tree and perhaps add functionality to auto-balance.
 */

const generateGeneSymbolList = async () => {
    /**
     *  Creates a json file with the list of gene symbols
     */
    try {
        console.log('Saving gene symbol list to GeneSymbolList.json');

        // Iterate through the gene list object and extract the gene symbols
        geneList.id_symbol_primary.map(item => {
            geneSymbols.push(item);
        });

        fs.writeFileSync('example/GeneSymbolList.json', JSON.stringify(geneSymbols));
    } catch (e) {
        console.log(e);
    }
}

const generateMerkleTree = async () => {
    /**
     *  Generate a Merkle Tree based on the geneSymbols array
     */
    try {
        console.log(`\nGenerating a Merkle Tree...`);
        tree = new MerkleTree(geneSymbols, keccak256, {sortPairs: true, sortLeaves: true, sort: true, hashLeaves: true});
        // For a short list, you can log it out, but not recommended for large lists
        // console.log('Tree:\n', tree.toString());
        
        fs.writeFileSync('./example/MerkleTree.txt', tree.toString());
        console.log(`Merkle tree generated.
        \nRoot hash is ${tree.getHexRoot()}
        \nTree Summary:
        \n     Leaf Count: ${tree.getLeafCount()}
        \n     Layer Count: ${tree.getLayerCount()}
        \n     Tree Depth: ${tree.getDepth()}
        \nSaving to MerkleTree.txt
        `);
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
        fs.writeFileSync('./example/MerkleTreeRoot.json', JSON.stringify(tree.getHexRoot()));
    } catch (e) {
        console.log(e);
    }
}

const generateTreeSummary = async () => {
    for (let i = 0; i < geneSymbols.length; i ++) {
        let currentHash;
        let currentValue;
        currentValue = geneSymbols[i];
        currentHash = `0x${keccak256(geneSymbols[i]).toString('hex')}`;
        /*
        *  Create an object for each gene containing:
        *  gene symbol, keccak256 hash, leaf index
        */
        leafValues.push({ "Leaf": currentValue, "Hash": currentHash})
    }
    fs.writeFileSync('./example/MerkleTreeSummary.json', JSON.stringify(leafValues));
}

generateGeneSymbolList()
    .then(generateMerkleTree())
    .then(generateMerkleRoot())
    .then(generateTreeSummary())