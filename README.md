# Merkle Tree Generator

This utility generates a Merkle tree from a provided list of objects in a json file called 'leaves.json'. The Merkle tree will be automatically generated and stored in 'MerkleTree.txt'.

The 'leaves.json' file must be a JSON array of values. Once the 'leaves.json' file is populated with the data, run:

```
$node generateHashArrayFile.js
```

To generate a Merkle tree and view via command line (this will not generate a file), use:

```
cat hashArray.json | merkletreejs --leaves=- --hash=keccak256 --output=tree
```

This utility is built with:

[merkletreejs](https://github.com/miguelmota/merkletreejs)

[merkletreejs-clie](https://github.com/miguelmota/merkletreejs-cli)

[keccak256](https://github.com/miguelmota/keccak256)