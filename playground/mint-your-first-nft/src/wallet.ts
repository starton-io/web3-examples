import {starton} from "./index";


export async function getWalletBalance(network: string, walletAddress: string) {
    const response = await starton.get(`/data/${network}/address/${walletAddress}/balance/native`)
    return response.data
}
