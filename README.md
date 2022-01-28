# Merkle Tree Generator

This utility generates a Merkle tree from a provided list of objects in a json file called 'leaves.json'.

Once the 'leaves.json' file is populated with the data, run:

```
$node generateHash.js
```

To generate a Merkle tree via command line, use:

```
cat hashArray.json | merkletreejs --leaves=- --hash=keccak256 --output=tree
```

This utility is built with
[merkletreejs](https://github.com/miguelmota/merkletreejs)
[merkletreejs-clie](https://github.com/miguelmota/merkletreejs-cli)
[keccak256](https://github.com/miguelmota/keccak256)