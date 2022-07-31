import React from 'react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../context';
import Link from 'next/link';
import Web3Modal from 'web3modal';
import {BigNumber, ethers} from 'ethers';
import { TokenAddress } from '../config';
import AcidToken from './AcidToken.sol/AcidToken.json';
import LBComponent from '../components/lbcomponents';

export default function Farm(props) {

  const account = useContext(AccountContext);
  const [players, setPlayers] = useState([]);
  const [playersLength, setPlayersLength] = useState(0);
  const [name, setName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const decimals = ethers.BigNumber.from(10).pow(18)

  let onValueChange = (event) => {
    setName(event.target.value);
  }

  async function getLeaderBoard(){
    const web3modal = new Web3Modal;
    const connection = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const contract = new ethers.Contract(TokenAddress, AcidToken.abi, provider)
    let playerQty = await contract.getPlayersLength();
    setPlayersLength(playerQty.toNumber());
    const playerList = [];
    for (let i = 0 ; i < playerQty; i++){
      let playerAddr = await contract.players(i);
      let playerBal = await contract.balanceOf(playerAddr);
      const player = {
        address: playerAddr,
        balance: playerBal.div(decimals).toNumber(),
      }
      playerList.push(player);
    }

    playerList.sort((b,a) => a.balance - b.balance);

    setPlayers(playerList);
    setIsLoaded(true);
  }

  async function registerName(event) {
    event.preventDefault();

    const web3modal = new Web3Modal;
    const connection = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TokenAddress, AcidToken.abi, signer)
    contract.registerName(name);
  }

  useEffect(() => {
    getLeaderBoard();
  }, [])

  return (

      <div className="flex flex-col items-center justify-center bg-white pl-96 w-full" style={{height: "100vh"}}>
      <div className="w-80 md:w-80" ></div>
      <div className="flex w-full items-center flex-col gap-4 text-black">
     
        <span className="text-center italic mt-9 leading-7 font-bold text-2xl">
          LeaderBoard
        </span>
        <span className="text-center leading-5 text-lg">
         Enter your name below to submit your score to the leaderboard!
          
          <br />
        </span>

        <form onSubmit={registerName}>
                                <input type="input" className="px-1 w-40 h-10 bg-slate-300 border-sky-900 border-solid border-2" placeholder="Your Name" onChange={onValueChange}></input>
                                <input className="cursor-pointer bg-sky-700 font-bold text-white rounded-3xl p-3 ml-8 -mt-3" type="submit" value="Register"></input>
                              </form>
      <div className="w-full rounded-2xl my-4 border-solid">
        <div className="relative">
          
          <div className="scroll-mt-16 overflow-visible">
          <table className="w-full text-base rounded mx-auto">
          <tbody>
          {(isLoaded)
          ?<tr className="cursor-pointer border-t-2 border-solid border-cyan-800">
          <td>
            <div className="px-6 pt-2 flex w-max content-center">
              <div>
                
              </div>
            </div>
          </td>
          <td>
          <div className="px-6 pt-2 w-full content-center">
              <div>
                <div className="text-l text-left pb-3">Player</div>
                
              </div>
            </div>
          </td>
          <td>
            <div className="px-6 pt-2 w-full content-center">
              <div>
                <div className="text-l text-left pb-3">Score</div>
                
              </div>
            </div>

          </td>
          <td>
          <div className="px-6 pt-2 w-full content-center">
              <div>
                <div className="text-l text-left pb-3">Best Single Run</div>
                
              </div>
            </div>
          </td>
          
         
        </tr>
        :<tr className="cursor-pointer border-t-2 border-solid border-cyan-800">
        <td>
          <div className="px-6 pt-2 flex w-max content-center">
            <div>
              
            </div>
          </div>
        </td>
        <td>
        <div className="px-6 pt-2 w-full content-center">
            <div>
              <div className="text-l text-left pb-3">Loading...</div>
              
            </div>
          </div>
        </td>
        <td>
          <div className="px-6 pt-2 w-full content-center">
            <div>
              <div className="text-l text-left pb-3">Loading...</div>
              
            </div>
          </div>

        </td>
        <td>
        <div className="px-6 pt-2 w-full content-center">
            <div>
              <div className="text-l text-left pb-3">Loading...</div>
              
            </div>
          </div>
        </td>
        
       
      </tr>}
            {players.map((player) => {
              return (
                <LBComponent key={player} value={player} />
              )
            })} 
           </tbody> 
          </table>   
          </div>
        </div>
      </div>
      </div>
      
    </div>
    

  
  )
}
