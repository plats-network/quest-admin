import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { options, OnChainRegistry, signCertificate, PinkContractPromise } from "@phala/sdk";
import abi from "./contract.json";
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { setAccount, setContract } from "../redux/stateCampaign";

const RPC_TESTNET_URL = "wss://poc6.phala.network/ws";
const PHALA_CONTRACTID = "0x70a2ed1491685e8c26e1717d832f7d18a15a880448cea9bc862569253b512af9";

export function main(dispatch) {
    const fetch = async() => {
      const api = await ApiPromise.create(
        options({
          provider: new WsProvider(RPC_TESTNET_URL),
          noInitWarn: true,
        })
      );
      const phatRegistry = await OnChainRegistry.create(api);
      const keyring = new Keyring({ type: "sr25519" });
      const pair = keyring.addFromUri("horror fantasy debris chicken document dress weather cream match sister midnight brother");
      const contractKey = await phatRegistry.getContractKeyOrFail(PHALA_CONTRACTID)
      const contract = new PinkContractPromise(api, phatRegistry, abi, PHALA_CONTRACTID, contractKey)
      const cert = await signCertificate({ pair })
      const injector = window.injectedWeb3['subwallet-js']
      const provider = await injector.enable('PhatContract Test')
      ///ADVANCE
      const providers = 'subwallet-js'
      const extensions = await web3Enable('My cool Phat Contract dApp')
        dispatch(setContract(contract))
      const availableAccounts = await web3Accounts()
      const account = availableAccounts[0]
      dispatch(setAccount(account))
    }
    fetch()
}
