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