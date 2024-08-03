export const showShortAddress = (address, amount) => {
   return `${address?.substring(0, amount)}...${address?.substring(
      address.length - amount,
      address.length
   )}`
}