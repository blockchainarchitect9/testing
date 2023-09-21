const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testing NFT", function () {
  let nftContract;
  it("Deployment Testing", async function () {
    const [owner] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("MyNFT");

    nftContract = await NFT.deploy();

    expect(nftContract.runner.address).to.equal(owner.address);
  });

  it("Should get the name", async function () {
    expect(await nftContract.name()).to.equal("HashTag");
  });

  it("Should get the symbol", async function () {
    expect(await nftContract.symbol()).to.equal("HT");
  });

  it("Should mint NFT", async function () {
    await expect(
      nftContract.MintNFT("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
    )
      .to.emit(nftContract, "Transfer")
      .withArgs(
        "0x0000000000000000000000000000000000000000",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        1
      );
  });

  it("Check owner", async function () {
    const nftOwner = await nftContract.ownerOf(1);
    expect(nftOwner).to.equal("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  });

  it("Should revert", async function () {
    const [owner, otherAc] = await ethers.getSigners();

    await expect(
      nftContract.connect(otherAc).changeTokenURI("other URI")
    ).to.be.revertedWith("You're not authorized");
  });
});
