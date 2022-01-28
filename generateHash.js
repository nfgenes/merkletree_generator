const keccak256 = require('keccak256');
const fs = require('fs');
const leaves = require('./leaves.json');

const leavesHashArray = [];

// iterate through the json array and hash each gene object
for (i = 0; i < leaves.length; i++) {
    let currentValue;
    console.log(JSON.stringify(leaves[i]));
    console.log(`Generating keccak256 hash for ${leaves[i].Symbol}`);

    currentValue = keccak256(JSON.stringify(leaves[i])).toString('hex');
    console.log(currentValue);
    leavesHashArray.push(currentValue);
}

console.log(`Hash array is length ${leavesHashArray.length}`);

// generate a new json file with the array of hashed objects
fs.writeFile('hashArray.json', JSON.stringify(leavesHashArray), err => {
    if (err) {
        throw err;
    }
    console.log('Hashed array saved to file');
});

console.log(leavesHashArray);
