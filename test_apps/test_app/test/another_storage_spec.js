/*global contract, config, it, embark, web3*/
const assert = require('assert');
const AnotherStorage = embark.require('Embark/contracts/AnotherStorage');
const SimpleStorage = embark.require('Embark/contracts/SimpleStorage');

let accounts;

config({
  deployment: {
    "accounts": [
      {
        "mnemonic": "example exile argue silk regular smile grass bomb merge arm assist farm",
        balance: "5ether"
      }
    ]
  },
  contracts: {
    "SimpleStorage": {
      args: [100]
    },
    "AnotherStorage": {
      args: ["$SimpleStorage"]
    }
  }
}, (err, theAccounts) => {
  accounts = theAccounts;
});

contract("AnotherStorage", function() {
  this.timeout(0);

  it("set SimpleStorage address", async function() {
    let result = await AnotherStorage.methods.simpleStorageAddress().call();
    assert.equal(result.toString(), SimpleStorage.options.address);
  });

  it('should set the balance correctly', async function () {
    const balance = await web3.eth.getBalance(accounts[0]);
    assert.ok(balance < 5000000000000000000);
    assert.ok(balance > 4000000000000000000);
  });
});
