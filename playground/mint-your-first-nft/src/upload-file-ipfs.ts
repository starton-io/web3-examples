import {starton} from "./index";
import * as fs from "fs";

export async function uploadFileToIPFS(filePath: string) {
    try {
        const formData = new FormData()
        const file =  fs.readFileSync(filePath)
        const blob = new Blob([file]);
        formData.append('file', blob, "File Name")

        const response = await starton.post('/ipfs/file', formData)
        return response.data
    } catch(error) {
        console.log(error)
    }
}
