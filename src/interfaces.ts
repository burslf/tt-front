interface OffchainData {
    name: string
    image: string
}

interface CreatedTickets {
    id: number
    created_at: number
    updated_at: number
    tx_hash: string
    indexed_chain_event_id: string
    event_id: number
    creator: string
    tickets_total: number
    tickets_left: number
    price: string
    event_date: number
    options_fees: number
    offchain_data: OffchainData
    shares: [string[], number[]]
    grey_market_allowed: boolean
    network_id: string
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

interface BuyTicketForm {
    amount: number
    recipient: string
}

export type {
    OffchainData,
    CreatedTickets,
    CreateEventForm,
    BuyTicketForm
}