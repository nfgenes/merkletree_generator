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