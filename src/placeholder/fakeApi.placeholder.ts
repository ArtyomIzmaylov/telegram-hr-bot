import {mockDataArray} from "../bot/data/mock.data";


export async function postRequest() {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return JSON.stringify({status : 200, data : mockDataArray})
}