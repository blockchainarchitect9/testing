const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NFT = await hre.ethers.getContractFactory("MyNFT");
  const nftContract = await NFT.deploy();
  await nftContract.waitForDeployment();

  let details = {
    deployer: nftContract.runner.address,
    contract: await nftContract.getAddress(),
  };

  console.log(
    `Account:${details.deployer} deployed the contract at ${details.contract}`
  );

  fs.writeFile("./details.json", JSON.stringify(details, null, 2), (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Details saved...");
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
