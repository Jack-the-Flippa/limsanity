import '../styles/globals.css'
import React, { Component } from 'react';
import Image from 'next/image'
import gudetama from './aez.png';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context'
import Link from "next/link";

function MyApp({ Component: Component, pageProps }) {

  const [account, setAccount] = useState('')
  let userAddress = ""

    async function getWeb3Modal() {
        const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "13c698f44aa7441d9776c0a770497702"
          }
        }
      }
    })

    return web3Modal
  }
  
    async function connect() {
        try {
            const web3Modal = await getWeb3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const accounts = await provider.listAccounts()
            setAccount(accounts[0])
            localStorage.setItem('isWalletConnected', true)
        } catch (err) {
            console.log('error: ', err)
        }
    }

    if (account !== ''){
      userAddress = account.slice(0, 5) + "..." + account.slice(-5);

      ethereum.on('accountsChanged', function (accounts: string) {
        setAccount(accounts[0])
      });
    }

    useEffect(() => {
      const connectWalletOnLoad = async () => {
        if (localStorage?.getItem('isWalletConnected')) {
          try {
            connect()
          } catch (ex) {
            console.log(ex)
          }
        }
      }
      connectWalletOnLoad()
    }, [])

    

    

  return (

    
    <div className="flex text-red h-full flex-col bg-red items-center w-full">
    <main className="text-red h-full w-full">
      <div>
        <div className="md:w-sidebar pb-10 shadow-xl items-center justify-between flex-grow hidden md:flex flex-col text-white z-40 pt-6 fixed top-0 left-0 bottom-0 bg-sky-900">
          <div className="items-center h-full justify-between flex flex-col px-8 w-full">
            <h1 className="mt-8 -mb-10 cursor-pointer w-56 text-4xl text-center font-serif">Limsanity</h1>
            <div className="mt-7 text-l text-center">Trouble in Thonglo<br/></div>
            
            <div className="flex flex-col items-center">
            {
                !account && <button className="bg-yellow-600 text-l font-semibold rounded-full px-5" onClick={connect}>Connect Wallet</button>      
            }
            {
                account && <div className="text-center italic bg-sky-700 px-5 py-1 rounded-md">Wallet Connected<br/>({userAddress})</div>
            }
             
                
            </div>
            <div className="flex items-center mt-10 flex-col text-white text-center">
              <Link href="/"><span className="mt-4 text-white hover:text-yellow-300 font-semibold text-xl cursor-pointer">Home</span></Link>
              
              <Link href="/play"><span className="mt-4 text-white hover:text-yellow-300 font-semibold text-xl cursor-pointer">Play</span></Link>
             
              
              <Link href="/leaderboard"><span className="mt-4 text-white hover:text-yellow-300 font-semibold text-xl cursor-pointer">Leaderboard</span></Link>

            </div>
            <div className="text-white mt-10 pl-2 flex flex-col gap-2 text-lg items-center rounded-full">
              
            </div>
            <div className="flex mt-10 flex-col font-semibold items-center">
              <div className="mb-8 w-56">
                <Image alt="logo" src={gudetama}></Image>
              </div>
              <span>Copyright 2022 - The Degen Collective</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:ml-sidebar relative flex-col">
        <AccountContext.Provider value={account}>
        <Component {...pageProps} connect={connect} />
        </AccountContext.Provider> 
      </div>
      
    </main>
    
    </div>
    
  )
}

export default MyApp
