import request from "@/store/request";

const friend = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/friend", "POST", body)
            return data
        },
        async UPDATE(context, query){
            const data = await request(context, "/friend"+query, "PUT")
            return data
        },
        async DELETE(context, query){
            const data = await request(context, "/friend"+query, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/friend"+query, "GET")
            return data
        }
    },

    // mutations: {
    //     SET_REQUESTS(state, obj){
    //         obj.items.map(item => state.USERS.push(item))
    //         state.TOTAL_REQUEST += obj.total
    //     },
    //     DELETE_REQUESTS(state, user){
    //         state.USERS.map((item, index) => item.id === user.id ? state.USERS.splice(index, 1) : null)
    //         state.TOTAL_REQUEST -= 1
    //     }
    // },

    // state: {
    //     TOTAL_REQUEST: 0,
    //     USERS: []
    // }
}

export default friend