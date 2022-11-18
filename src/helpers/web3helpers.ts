import {formatDate} from './utils';

const concatAddress = (address: string) => {
    return `${address.substring(0,6)}...${address.substring(38,42)}`
}

const timestampToDate = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000)
    return formatDate(date)
}

const networkIdToName = {
    1: {
        name: "ETHEREUM",
        currency: "ETH",
        logo: 'eth'
    },
    56: {
        name: "BSC",
        currency: "BNB",
        logo: 'bnb'
    },
    137: {
        name: "POLYGON",
        currency: "MATIC",
        logo: 'matic'

    },
    
}

export {
    concatAddress,
    networkIdToName,
    timestampToDate
}