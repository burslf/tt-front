interface OffchainData {
    name: string
    image: string
}

interface CreatedTickets {
    id: number,
    tx_hash: string,
    event_id: number,
    creator: string,
    price: string,
    tickets_total: number,
    tickets_left: number,
    event_date: string,
    options_fees: number,
    offchain_data: OffchainData,
    shares: [],
    grey_market_allowed: boolean
}

interface CreateEventForm {
    eventName: string,
    eventImage: File,
    eventPrice: string,
    ticketsTotal: string,
    eventDate: string,
    optionsFees: string,
    shares: [],
    greyMarketAllowed: boolean,
}

export type {
    OffchainData,
    CreatedTickets,
    CreateEventForm
}