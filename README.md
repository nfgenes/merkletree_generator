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

This utility generates a Merkle tree from a provided list of objects in a json file called 'NFgenesList.json'. The Merkle tree will be automatically generated and stored in 'MerkleTree.txt'.

The 'NFgenesList.json' file must be a JSON array of values. Once the 'NFgenesList.json' file is populated with the data, run:

```
$node generateHashArrayFile.js
```

Once the above command is run:
- The file 'MerkleLeaves.json' will be created or overwritten to contain a json array of hexadecimal values representing the keccak256 hash of each gene in the source list.
- The file 'MerkleTree.txt' will be created or overwritten to contain the generated Merkle Tree of the json array contained in the 'hashArray.json' file.
- The file 'MerkleTreeRoot.txt' will be created or overwritten to contain the Merkle Tree root hash. This will be used to store in our NFgenes minting contract to perform a check against the valid list of NFgenes that are available to mint.

To generate a Merkle tree and view via command line (this will not generate a file), use:

```
cat MerkleLeaves.json | merkletreejs --leaves=- --hash=keccak256 --output=tree
```

This utility is built with:

[merkletreejs](https://github.com/miguelmota/merkletreejs)

[merkletreejs-clie](https://github.com/miguelmota/merkletreejs-cli)

[keccak256](https://github.com/miguelmota/keccak256)