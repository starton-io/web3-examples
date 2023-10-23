import {starton} from "./index";
import {AxiosError} from "axios";

export async function deploySmartContract(network: string, signerWallet: string) {
    try {
        const pin = await starton.post('/ipfs/json', {
            name: 'Starton Playground NFT Collection',
            content: {
                name: `Starton Playground NFT Collection`,
                description: `This NFT collection was created in Starton's playground. Congrats and have fun building on the blockchain!`,
                image: `https://eu.starton-ipfs.com/ipfs/bafybeicj2womtzppwk7eujerquuhfe5ogtthi4hevmuzsi56cm73agaqim`,
            },
        })

        const smartContractResponse = await starton.post(
            '/smart-contract/from-template',
            {
                name: "My playground smart contract",
                templateId: 'ERC721_META_TRANSACTION',
                description: 'ERC721 Smart Contract from the Starton Playground',
                network: network,
                params: [
                    // Smart contract's name
                    '[Starton Playground] NFT Mint',
                    // Smart contract's tokens symbol
                    'SPNM',
                    // Base Token URI
                    'ipfs://ipfs/',
                    // Contract URI (collection metadata)
                    `ipfs://${pin.data.id}`,
                    // Initial owner wallet
                    signerWallet
                ],
                signerWallet: signerWallet
            },
        )
        return smartContractResponse.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error?.response?.data);
        } else {
            console.log(error)
        }
    }
}
