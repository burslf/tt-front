export const concatAddress = (address: string) => {
    return `${address.substring(0,6)}...${address.substring(38,42)}`
}

export const networkIdToName = {
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