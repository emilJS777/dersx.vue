import request from "@/store/request";


const notification = {
    namespaced: true,
    actions: {
        async GET(context, query){
            const data = await request(context, `/notification${query}`, "GET")
            return data
        },
        async DELETE(context, query){
            const data = await request(context, `/notification${query}`, "DELETE")
            return data
        }
    },
    mutations: {
        SET_NOTIFICATIONS(state, notifications){
            notifications.map(notification => {
                state.NOTIFICATIONS.push(notification)
            })
        },
        SET_NOTIFICATION_IDS(state, notification_ids){
            notification_ids.map(id => state.NOTIFICATION_IDS.push(id))
        },
        DELETE_NOTIFICATION_id(state, notification_id){
            state.NOTIFICATION_IDS.map((id, index) => id === notification_id? state.NOTIFICATION_IDS.splice(index, 1) : null)
        }
    },

    state: {
        NOTIFICATION_IDS: [],
        NOTIFICATIONS: []
    }
}

export default notification