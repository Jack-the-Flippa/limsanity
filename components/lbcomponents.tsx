import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../context';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import { TokenAddress, gameAddress } from '../config';
import AcidToken from '../pages/AcidToken.sol/AcidToken.json';
import Limsanity from '../pages/Limsanity.sol/Limsanity.json';

export default function LBComponent(props){
    const account = useContext(AccountContext);
    const [stakeValue, setStakeValue] = useState(0);
    const [name, setName] = useState("");
    const [highScore, setHighScore] = useState(0);
    const [userWallet, setUserWallet] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const decimals = ethers.BigNumber.from(10).pow(18)
    const [isLoaded, setIsLoaded] = useState(false);

    const player = props.value.address

    let onValueChange = (event) => {
        setName(event.target.value);
      }

      useEffect(() => {

        getUserInfo();
        getTokenBalance();
        getHighScore();
    }, [account])

  async function getUserInfo() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const contract = new ethers.Contract(TokenAddress, AcidToken.abi, provider)
        let name = await contract.addressToName(player)
        setName(name)
  }

  async function getTokenBalance() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const contract = new ethers.Contract(TokenAddress, AcidToken.abi, provider)
    let balance = await contract.balanceOf(player)
    setUserWallet(balance.div(decimals).toNumber())
  }

  async function getHighScore() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(gameAddress, Limsanity.abi, signer)
    let score = await contract.highScore(player);
    setHighScore(score.div(decimals).toNumber())
    setIsLoaded(true);
  }

    return     (isLoaded) ? <tr key={player} className="cursor-pointer border-t-2 border-solid border-cyan-800">
                  <td>
                    <div className="px-6 pt-2 flex w-max content-center">
                      <div>
                        <div className="flex min-h-24 content-center">
                          
                        
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                  <div className="px-6 pt-2 w-full content-center">
                      <div>
                        
                        <div className="min-h-24 flex content-center">
                          <span className="flex content-center">{name}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="px-6 pt-2 w-full content-center">
                      <div>
                      
                        <div className="min-h-24 flex content-center">
                          <span className="flex content-center">{userWallet}</span>
                        </div>
                      </div>
                    </div>

                  </td>
                  <td>
                  <div className="px-6 pt-2 w-full content-center">
                      <div>
                      
                        <div className="min-h-24 flex content-center">
                          <span className="flex content-center">{highScore}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                 
                </tr>
                : <tr key={player} className="cursor-pointer border-t-2 border-solid border-cyan-800">
                <td>
                  <div className="px-6 pt-2 flex w-max content-center">
                    <div>
                      <div className="flex min-h-24 content-center">
                        
                      
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                <div className="px-6 pt-2 w-full content-center">
                    <div>
                      
                      <div className="min-h-24 flex content-center">
                        <span className="flex content-center">Loading...</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="px-6 pt-2 w-full content-center">
                    <div>
                    
                      <div className="min-h-24 flex content-center">
                        <span className="flex content-center">Loading...</span>
                      </div>
                    </div>
                  </div>

                </td>
                <td>
                <div className="px-6 pt-2 w-full content-center">
                    <div>
                    
                      <div className="min-h-24 flex content-center">
                        <span className="flex content-center">Loading...</span>
                      </div>
                    </div>
                  </div>
                </td>
                
               
              </tr>
                
              
    

}