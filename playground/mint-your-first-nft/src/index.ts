import axios from "axios";
import {getNetworks} from "./networks";
import {getWalletBalance} from "./wallet";
import {deploySmartContract} from "./deploy-smart-contract";
import {config} from 'dotenv'
import {uploadFileToIPFS} from "./upload-file-ipfs";
import {mintNft} from "./mint-nft";

config()

export const starton = axios.create({
    baseURL: 'https://api.starton.com/v3',
    headers: {
        'x-api-key': process.env.STARTON_API_KEY
    }
})

export const selectedNetwork = 'avalanche-fuji'

async function main() {
    // Get all networks
    // const networks = await getNetworks()
    // console.log('Available Starton Networks', networks.map((network: { name: string }) => network.name))

    // Get wallet balance
    const walletBalance = await getWalletBalance(selectedNetwork, process.env.WALLET_ADDRESS as string)
    console.log(walletBalance)

    // Deploy smart contract
    const smartContract = await deploySmartContract('avalanche-fuji', process.env.WALLET_ADDRESS as string)
    const smartContractAddress = smartContract?.address
    if (!smartContractAddress) return
    console.log('Smart Contract Deployed:', smartContractAddress)

    // Upload and mint NFT
    const pin = await uploadFileToIPFS(__dirname + '/assets/img.png')
    const nft = await mintNft({
        cid: pin.id,
        smartContractAddress,
        network: selectedNetwork,
        signerWallet: process.env.WALLET_ADDRESS as string
    })
    console.log(nft)
}

void main()
