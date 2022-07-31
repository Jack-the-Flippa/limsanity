import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { AccountContext } from '../context';
import mainimage from './aez2.png'; 
import Link from 'next/link';

export default function Home(props) {

  const account = useContext(AccountContext);
  const cnct = props.connect;
  

  return (

    <div className="flex flex-col items-center justify-center bg-white" style={{height: "100vh"}}>

    <div className="w-80 md:w-80" ><Image className="" alt='eggyboi' src={mainimage}></Image></div>
    <div className="flex w-full items-center flex-col gap-4 text-gray-800">
   
      <span className="text-center italic mt-9 leading-7 font-bold text-2xl">
        AEZ IS LOST IN BANGKOK!
      </span>
      <span className="text-center leading-5 text-lg">
        Help him fight through hordes of party girls and find his way back to his condo!
        <br /><br />
        Connect your wallet (in-game) and earn tokens the more points your score!
        <br /><br />
        <strong>NOTE: This game runs on Rinkeby Testnet.  </strong><br/> <br />
        Make sure you are connected to the Rinkeby Testnet if you want to earn and stake tokens. 
        <br/> <br />Otherwise, a Web3 connection is not necessary to play the game.
        <br /><br />
    
        <i><Link href="https://faucets.chain.link/rinkeby"><span className="text-blue-900 underline cursor-pointer">Click here to get Free Testnet Ether. (ChainLink website)</span></Link></i>
        <br />
      </span>
    </div>
    
  </div>
    

  
  )
}
