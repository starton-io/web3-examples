import {starton} from "./index";
import {AxiosError} from "axios";

/*
|--------------------------------------------------------------------------
| Methods
|--------------------------------------------------------------------------
*/
export async function getNetworks() {
    try {
        const response = await starton.get('/network')
        return response.data.items
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        } else {
            console.log(error)
        }
    }
}
