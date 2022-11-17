const { ethers } = require("ethers");
const { Contract, Provider, setMulticallAddress } = require("ethers-multicall");

const ERCABI = require("../abi/ERC20.json");

const BSC_TESTNET_RPC =
  "https://bsc-testnet.nodereal.io/v1/38470031e9f94a6e8804a7523bb422f5";

const BSC_RPC = "https://bscrpc.com";
const RBA_RPC = "https://preseed-testnet-1.roburna.com/";

module.exports.isTokenOrAddress = async (networkName, address) => {
  let RPC = RBA_RPC;
  setMulticallAddress(159, "0x4e1845Ab1d9D464150777a931Ce8FDaaD1cf8229");

  if (networkName == "97") {
    RPC = BSC_TESTNET_RPC;
  } else if (networkName == "56") {
    RPC = BSC_RPC;
  }

  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();

  const tokenContract = new Contract(address, ERCABI);
  let calls = [];
  try {
    calls.push(tokenContract.name());
    calls.push(tokenContract.symbol());
    calls.push(tokenContract.decimals());
    calls.push(tokenContract.totalSupply());

    const [name, symbol, decimal, totalSupply] = await ethcallProvider.all(
      calls
    );
    return {
      success: true,
      data: {
        name: name,
        symbol: symbol,
        decimal: decimal,
        totalSupply: totalSupply.toString(),
      },
    };
  } catch (error) {
    // console.log(error);
    return {
      success: false,
      data: {},
    };
  }
};
