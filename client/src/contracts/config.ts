import abiCrowdSale from './abis/lckCrowdSale.json';
import abiLCKToken from './abis/lckToken.json';
import { ethers } from "ethers";

export const LCK_TOKEN_ADDRESS: string = process.env.REACT_APP_TOKEN_ADDRESS || '';
export const CROWDSALE_ADDRESS: string = process.env.REACT_APP_ICO_ADDRESS || '';
export const getAbiLCKToken = () => abiLCKToken;
export const getAbiCrowSale = () => abiCrowdSale;
export const rpcProvider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PUBLIC_RPC_TESTNET || 'https://data-seed-prebsc-1-s1.binance.org:8545/');