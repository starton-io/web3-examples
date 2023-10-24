import { starton } from './index'
import * as fs from 'fs'

export async function uploadNFTMetadata (filePath: string) {
  // Load file, either from a local system or
  // a remote source like Amazon s3 or google cloud bucket
  const file = fs.readFileSync(filePath)
  const blob = new Blob([file])

  const formData = new FormData()
  formData.append('file', blob, 'File Name')

  // Upload the file to IPFS
  const pinnedImage = await starton.post(
    '/ipfs/file',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  // Upload the metadata to IPFS
  return await starton.post('/ipfs/json', {
    name: 'Starton Playground NFT metadata',
    content: {
      name: 'Starton Playground NFT',
      description: 'This NFT was created in Starton\'s playground. Congrats and have fun building on the blockchain!',
      image: `https://eu.starton-ipfs.com/ipfs/${pinnedImage.data.cid}`
    }
  })
}
