const { expect } = require("chai");

describe("Share files contract", function () {
  it("Deployment should assign uploaded files to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const ShareFile = await ethers.getContractFactory("ShareFile");

    const hardhatToken = await ShareFile.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});