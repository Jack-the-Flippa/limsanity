import React from 'react';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { AccountContext } from '../context';
import mainimage from './aez2.png'; 
import Link from 'next/link';
import Web3Modal from 'web3modal';
import { Unity, useUnityContext } from "react-unity-webgl";
import Web3 from 'web3';


export default function Play(props) {

  useEffect(() => {
    window.web3gl = {
      networkId: 0,
      connect,
      connectAccount: "",
      sendContract,
      sendContractResponse: "",
  };
  }, [])

// load web3gl to connect to unity



// will be defined after connect()
let provider;
let web3;

/*
paste this in inspector to connect to wallet:
window.web3gl.connect()
*/
async function connect() {


  const web3Modal = new Web3Modal;

  web3Modal.clearCachedProvider();

  // set provider
  provider = await web3Modal.connect();
  web3 = new Web3(provider);

  // set current network id
  web3gl.networkId = parseInt(provider.chainId);

  // if current network id is not equal to network id, then switch
  if (web3gl.networkId != window.web3ChainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${window.web3ChainId.toString(16)}` }], // chainId must be in hexadecimal numbers
      });
    } catch {
      // if network isn't added, pop-up metamask to add
      await addEthereumChain();
    }
  }

  // set current account
  // provider.selectedAddress works for metamask and torus
  // provider.accounts[0] works for walletconnect
  web3gl.connectAccount = provider.selectedAddress || provider.accounts[0];

  // refresh page if player changes account
  provider.on("accountsChanged", (accounts) => {
    window.location.reload();
  });

  // update if player changes network
  provider.on("chainChanged", (chainId) => {
    web3gl.networkId = parseInt(chainId);
  });
}

async function sendContract(method, abi, contract, args, value, gasLimit, gasPrice) {
  const from = (await web3.eth.getAccounts())[0];
  new web3.eth.Contract(JSON.parse(abi), contract).methods[method](...JSON.parse(args))
      .send({
        from,
        value,
        gas: gasLimit ? gasLimit : undefined,
        gasPrice: gasPrice ? gasPrice : undefined,
      })
      .on("transactionHash", (transactionHash) => {
        window.web3gl.sendContractResponse = transactionHash;
      })
      .on("error", (error) => {
        window.web3gl.sendContractResponse = error.message;
      });
}

//Code Here

  const account = useContext(AccountContext);
  const cnct = props.connect;
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/limsanity.loader.js",
    dataUrl: "build/limsanity.data",
    frameworkUrl: "build/limsanity.framework.js",
    codeUrl: "build/limsanity.wasm",
  });


  return (

    <div className="flex flex-col items-center justify-center bg-white" style={{height: "100vh"}}>

    <div className="flex w-full items-center flex-col gap-4">

      <div className ="flex flex-col">
        <div className="px-0 py-10 flex-shrink-0 h-fit flex">
          <div className="w-80 mt-0">
          <Unity unityProvider={unityProvider} style={{ width: 293, height: 532 }} />
          </div>
        </div>
      </div>


    </div>
    
  </div>
    

  
  )
}
