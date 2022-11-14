import { Web3Storage } from 'web3.storage';

const token = process.env['WEB3_STORAGE_API_TOKEN']
const prefix = "https://"
const suffix = ".ipfs.w3s.link/"

function makeStorageClient() {
  return new Web3Storage({ token: token })
}

async function listUploads () {
    const client = makeStorageClient()
    const uploads = []
    for await (const upload of client.list()) {
        if (upload.name.startsWith('project')){
            const response = await fetch(`${prefix}${upload.cid}${suffix}${upload.name}.json`)
            const responseJson = await response.json()
            const albumUrl = await extractCIDToUrl(client, responseJson['albumFile'])
            responseJson['albumFile'] = albumUrl;
            const artistProgileUrl = await extractCIDToUrl(client, responseJson['artistProfileFile'])
            responseJson['artistProfileFile'] = artistProgileUrl;
            uploads.push(responseJson)
        }
    }
    return uploads
}

async function extractCIDToUrl(client, cid) {
    const fileFromCid = await client.get(cid)
    const files = await fileFromCid.files()
    let url; 
    if (files.length > 1) {
        throw Error("More than one file found");
    }
    for (const file of files){
        url = `${prefix}${cid}${suffix}${file.name}`
    }

    return url
}



  export {prefix, suffix, listUploads}
