export const triggerBackendMonitor = async () => {
    if (!process.env['VUE_APP_SALT_SECRET']) {
        throw 'Missing auth token'
    }
    const response = await fetch('https://dev-api.ticketrust.io/trigger-monitor', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env['VUE_APP_SALT_SECRET']}`
        }
    })

    if (!response.ok){
        throw response.json()
    }
    
    return response.json()
}
