import moment from 'moment';
import 'moment/locale/vi';
import { ethers } from 'ethers';

export const showShortAddress = (address, amount) => {
   return `${address?.substring(0, amount)}...${address?.substring(
      address.length - amount,
      address.length
   )}`
}

export const formatTime = (createdAt) => {
   moment.locale('vi');
   return moment(createdAt).fromNow();
}

export const formatToEth = (bigNumber) => {
   return Number.parseFloat(ethers.utils.formatEther(bigNumber))
}