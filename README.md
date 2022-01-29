# NFgenes (NonFungible Genes) Overview

NFgenes is a decentralized science (DeSci) project aiming to bring data and collaboration for human genome research to the blockchain. Share knowledge, create value, build a community and teach science.

- [Roadmap](https://github.com/nfgenes/overview#roadmap)
- [NFgene List and Genesis Collection](https://github.com/nfgenes/nfgenes_list#nfgenes-nonfungible-genes-overview)
    - [NFgenes List](https://github.com/nfgenes/nfgenes_list/tree/main/data#nfgenes-list)
        - [Demo Proof of Concept: Storing NFgenes List on IPFS](https://nfgeneslist.onrender.com/)
        - [Repository](https://github.com/nfgenes/front_end_nfgenes_list#nfgenes-nonfungible-genes-overview)
    - [Genesis NFT Collection](https://github.com/nfgenes/nfgenes_contract)
- [Methodology for Compiling original list of NFgenes](https://github.com/nfgenes/compile_genesis_gene_list)
- Utilities
    - [Merkle Tree generator](https://github.com/nfgenes/merkletree_generator)
    - [Python scripts to convert NFgene source data from csv to SVG and PNG](https://github.com/nfgenes/csv2svg2png#csv2svg2png)

# Merkle Tree Generator

This utility generates a Merkle tree from a provided list of genes in a json file called 'NFgenesList.json'. The Merkle tree will be automatically generated and stored in 'MerkleTree.txt'.

## To Use

```
yarn or npm install
```

The 'NFgenesList.json' file must be a JSON array of gene symbols. Once the 'NFgenesList.json' file is populated with the data, run:

## Generate an array of hashed gene symbols and Merkle Tree

```
$node generateHashArrayFile.js
```

Once the above command is run:
- The file 'MerkleLeaves.json' will be created or overwritten to contain a json array of hexadecimal values representing the keccak256 hash of each gene in the source list.
- The file 'MerkleTree.txt' will be created or overwritten to contain the generated Merkle Tree of the json array contained in the 'hashArray.json' file.
- The file 'MerkleTreeRoot.txt' will be created or overwritten to contain the Merkle Tree root hash. This will be used to store in our NFgenes minting contract to perform a check against the valid list of NFgenes that are available to mint.

- [Example output array of hashed values](https://github.com/nfgenes/merkletree_generator/blob/main/MerkleLeaves.json)
- [Example output Merkle Tree](https://github.com/nfgenes/merkletree_generator/blob/main/MerkleTree.txt)

## Generate a Merkle Tree Summary

Running the below script will generate a summary containing each leaf value with its corresponding keccak256 hash and leaf index. This is useful when you want to generate a proof. You can quickly determine which value and corresponding hash and index is necessary.

```
node generateTreeSummary.js
```

- [Example output Merkle Tree Summary](https://github.com/nfgenes/merkletree_generator/blob/main/MerkleTreeSummary.json)

## Generate a Merkle Proof

The below script will generate a Merkle Proof file containing necessary information to pass into the VPBM contract. Simply copy and past the contents of the file into the calldata.

```
node generateMerkleProof.js
```

- [Example Merkle Proof](https://github.com/nfgenes/merkletree_generator/blob/main/MerkleTreeProof.txt)

To generate a Merkle tree and view via command line (this will not generate a file), use:

```
cat MerkleLeaves.json | merkletreejs --leaves=- --hash=keccak256 --output=tree
```

This utility is built with:

[merkletreejs](https://github.com/miguelmota/merkletreejs)

[merkletreejs-clie](https://github.com/miguelmota/merkletreejs-cli)

[keccak256](https://github.com/miguelmota/keccak256)