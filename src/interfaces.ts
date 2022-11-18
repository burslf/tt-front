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
    eventImage: File | null,
    eventPrice: number | null,
    ticketsTotal: number | null,
    eventDate: string,
    optionsFees: number | null,
    payees: string[],
    shares: number[],
    greyMarketAllowed: boolean,
}

export type {
    OffchainData,
    CreatedTickets,
    CreateEventForm
}