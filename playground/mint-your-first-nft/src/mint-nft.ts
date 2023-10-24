import { starton } from './index'
import { AxiosError } from 'axios'

/*
|--------------------------------------------------------------------------
| Contract
|--------------------------------------------------------------------------
*/
export interface MintNftProps {
  network: string
  smartContractAddress: string
  cid: string
  signerWallet: string
}

/*
|--------------------------------------------------------------------------
| Method
|--------------------------------------------------------------------------
*/
export async function mintNft ({ network, cid, smartContractAddress, signerWallet }: MintNftProps) {
  try {
    const response = await starton.post(`/smart-contract/${network}/${smartContractAddress}/call`,
      {
        functionName: 'mint(address,string)',
        params: [smartContractAddress, cid],
        signerWallet,
        speed: 'average'
      })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    } else {
      console.log(error)
    }
  }
}
