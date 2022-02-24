# NFgenes 🧬⛓ - Merkle Tree Generator

This utility generates a Merkle tree from a provided list of genes in a json file `./data/NFgenesList.json`. A text representation of the Merkle tree will be generated and stored in `MerkleTree.txt`*. *Note: This is not useful for anything other than having a visual represenation.

## To Use

```
yarn or npm install
```

The `./data/NFgenesList.json` file must be a JSON array of gene symbols. Once the `NFgenesList.json` file is populated with the data, run:

## Generate an array of hashed gene symbols and Merkle Tree

```
$node generateMerkleTree.js
```

Once the above command is run:
- The file `GeneSymbolList.json` will be created or overwritten to contain a json array of gene symbols extracted from the source data found at `./data/NFgenesList.json`.
- The file `MerkleTree.txt` will be created or overwritten to contain a textual representation of the generated Merkle Tree.
- The file `MerkleTreeRoot.txt` will be created or overwritten to contain the Merkle Tree root hash. This will be used to store in our NFgenes minting contract to perform a check against the valid list of NFgenes that are available to mint.
- The file `MerkleTreeSummary.json` will be created or overwritten to contain a summary of each leaf with its corresponding leaf hash

- [Example output of gene symbol list](https://github.com/nfgenes/merkletree_generator/blob/main/example/GeneSymbolList.json)
- [Example output Merkle Tree](https://github.com/nfgenes/merkletree_generator/blob/main/example/MerkleTree.txt)
- [Example output Merkle Root](https://github.com/nfgenes/merkletree_generator/blob/main/example/MerkleTreeRoot.json)
- [Example output Merkle Tree Summary](https://github.com/nfgenes/merkletree_generator/blob/main/example/MerkleTreeSummary.json)

## Generate a Merkle Proof

The below script will generate a Merkle Proof containing necessary information to pass into the VPBM contract. Simply copy and past the contents of the file into the calldata.

```
node generateMerkleProof.js
```

You will need to provide a value that is available in `GeneSymbolList.json`.
![merkle proof value selection](https://github.com/nfgenes/merkletree_generator/blob/main/doc/symbol_parameter.png)

A file containing the Merkle Proof that can be copy and pasted into the contract function argument will be saved to `MerkleProof_[symbol].json` where `[symbol]` is replaced with the symbol that was passed into the `generateMerkleTree()` function.

![Example Merkle Proof - Console.log()](https://github.com/nfgenes/merkletree_generator/blob/main/doc/generate_merkleproof_example.png)

![Example Merkle Proof - File output](https://github.com/nfgenes/merkletree_generator/blob/main/doc/generate_merkleproof_example_result.png)

## Resources

This repo is built using:
--------------------------

[merkletreejs](https://github.com/miguelmota/merkletreejs)

[merkletreejs-clie](https://github.com/miguelmota/merkletreejs-cli)

[keccak256](https://github.com/miguelmota/keccak256)

Helpful Resources on Merkle Trees
--------------------------------

- [OpenZeppelin Merkle Proof Contract Library](https://docs.openzeppelin.com/contracts/4.x/api/utils#MerkleProof)
- [merkletreejs Library](https://github.com/miguelmota/merkletreejs)
- [Smart Contract Programmer - Merkle Trees](https://www.youtube.com/watch?v=n6nEPaE7KZ8)
- [Using Merkle Trees for NFT Whitelists](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9)

Learn more about the [NFgenes 🧬⛓ project](https://github.com/nfgenes/overview#nfgenes-nonfungible-genes-overview)