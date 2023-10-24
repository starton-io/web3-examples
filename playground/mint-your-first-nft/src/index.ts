import axios, { AxiosError } from 'axios'
import { config } from 'dotenv'
import { uploadNFTMetadata } from './upload-file-ipfs'
import { mintNft } from './mint-nft'
import path from 'path'
import { deploySmartContract, uploadSmartContractMetadata } from './deploy-smart-contract'

config()

export const starton = axios.create({
  baseURL: 'https://api.starton.com/v3',
  headers: {
    'x-api-key': process.env.STARTON_API_KEY
  }
})

export const selectedNetwork = 'avalanche-fuji'

async function main () {
  try {
    // Upload smart contract metadata
    const metadata = await uploadSmartContractMetadata()
    // Deploy smart contract
    const smartContract = await deploySmartContract(process.env.WALLET_ADDRESS as string, selectedNetwork, metadata.data.cid)
    const smartContractAddress = smartContract?.data?.smartContract?.address
    if (!smartContractAddress) {
      throw new Error('Smart contract address is missing')
    }
    console.log('Smart Contract deployed on address:', smartContractAddress)

    // Upload and mint NFT
    const pin = await uploadNFTMetadata(path.join(__dirname, '/assets/img.png'))
    console.log('Image uploaded with CID:', pin.data.cid)
    const nft = await mintNft({
      cid: pin.data.cid,
      smartContractAddress,
      network: selectedNetwork,
      signerWallet: process.env.WALLET_ADDRESS as string
    })
    console.log('NFT minted:', nft.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error?.response?.request.path, error?.response?.data)
    }
    console.log(error)
  }
}

void main()
