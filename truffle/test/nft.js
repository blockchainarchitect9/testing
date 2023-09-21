const nft = artifacts.require("MyNFT");

contract("Testing NFT Contract", function (accounts) {
  let nftContract;
  it("Should deploy the contract", async function () {
    nftContract = await nft.deployed();
    const deployerAddress = nftContract.constructor.class_defaults.from;
    console.log(deployerAddress);
    assert.isTrue(deployerAddress == accounts[0]);
    //return assert.isTrue(true);
  });
  it("Should get the name", async function () {
    const name = await nftContract.name();
    console.log(name);
    assert.equal(name, "HashTag");
  });
  it("Should get the symbol", async function () {
    const symbol = await nftContract.symbol();
    console.log(symbol);
    assert.equal(symbol, "HT");
  });
  it("Minting Test", async function () {
    const mintTx = await nftContract.MintNFT(
      "0x9B93fD492B8f4E01fc979Efc0A0727a923Cb509E"
    );
    const mintEvent = mintTx.logs[0];
    console.log(mintEvent);
    assert.equal(mintEvent.event, "Transfer");
    assert.equal(
      mintEvent.args["1"],
      "0x9B93fD492B8f4E01fc979Efc0A0727a923Cb509E"
    );
    assert.equal(mintEvent.args["2"].toNumber(), 1);
  });

  it("Should get the correct owner", async function () {
    const nftOwner = await nftContract.ownerOf(1);
    console.log(nftOwner);
    assert.equal(nftOwner, "0x9B93fD492B8f4E01fc979Efc0A0727a923Cb509E");
  });

  it("Should get the URI", async function () {
    const URI = await nftContract.tokenURI(1);
    console.log(URI);
    assert.equal(URI, "genesis");
  });

  it("Should get the URI", async function () {
    const URITrx = await nftContract.changeTokenURI("revelations");
    const URIEvent = URITrx.logs[0];

    assert.equal(URIEvent.args["0"], "revelations");
  });

  it("The URI update should fail", async function () {
    try {
      await nftContract.changeTokenURI("something else", { from: accounts[1] });
    } catch (error) {
      assert.equal(error.data.reason, "You're not authorized");
    }
  });
});
