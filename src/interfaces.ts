interface OffchainData {
    name: string
    image: string
}

interface CreatedTickets {
    id: number
    created_at: string
    updated_at: string
    tx_hash: string
    indexed_chain_event_id: number
    event_id: number
    creator: string
    tickets_total: number
    tickets_left: number
    price: number
    event_date: number
    options_fees: number
    offchain_data: OffchainData
    shares: [string[], number[]]
    grey_market_allowed: boolean
    network_id: number
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