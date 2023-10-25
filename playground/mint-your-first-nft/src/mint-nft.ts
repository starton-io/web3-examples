import { starton } from './index'

export interface MintNftProps {
  network: string
  smartContractAddress: string
  cid: string
  signerWallet: string
}

export async function mintNft ({ network, cid, smartContractAddress, signerWallet }: MintNftProps) {
  return await starton.post(`/smart-contract/${network}/${smartContractAddress}/call`,
    {
      functionName: 'mint(address,string)',
      params: [smartContractAddress, cid],
      signerWallet,
      speed: 'average'
    })
}
