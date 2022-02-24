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

## Sample Smart Contract Implementation
- Sample Root Hash: "0x9b940b90aeb7ba14d0337f272a01143604516b83f1fc772c5d5d82995ad415a0"
- Sample Proof: 
```
{
  "Leaf Value": "HAX1",
  "Leaf Hex": "48415831",
  "LeafHash": "0x91933e9a3f692378db35865c6e03977355c08334905024a9cbf0fb2ea53f2335",
  "Proof": [
    "0x918c65c4ff343aba1b16d5e167f7f0a5c45b4dc9a0060f344dde130293601f77",
    "0xa0897f90b6a19494724724e4acf5ece124f3e9def9cf319f7d271b601310bda3",
    "0x89cf54a9d0d2325345394253ab2a4ac24276e0eac6d88e8286cfd6d633ff0ddb",
    "0x74c7aa36d8bfea1434c79763628bd9c382b0e6a6d75b71b79ed91e18d6d2205f",
    "0xa89ec44bcd746da7f865d89f85d05924ec344d927b03a0d69b931d0aae8fb508",
    "0x4b1ce400a43b6fcece4a40face31846f244e08e44f13c815d8c09126ce004538",
    "0xf53baaaf2e1c27f535057fd79e1846751a6f5296a900b11d41883bf667e44084",
    "0x4a012c2f89ecdfdfed0c6514960cd161060ab8b941be956cbf1749b7e679107d",
    "0x8954028403afb20964f6e45221649aacfbdc75ff5459a8c82b67ccc679855557",
    "0x94039d13a431084508f9f1d2c49909591af0216904ae29f4107eb5a951743c9b",
    "0x231e8935bbabe7825b67643ed5466ecc850fcaeafaf4f10ef55bb5486c025e81",
    "0xdbef638b800cdbe49d722e0c18805637506b411e3eee8399cb3c617660e44bff",
    "0x672bca2df821d58846413f89865e665bb66439668214b7d80d4208de43aadff0",
    "0xae886e90907d08fc2a56c51172102c6556f5e50e188c6005550463c2d8572dbe",
    "0x0d58d9c38b5ff10861d439ac99205e429a71bf49f1911af6ddf5fdb6bccee36f"
  ]
}
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