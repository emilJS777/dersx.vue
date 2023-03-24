import request from "@/store/request";

const room = {
    namespaced: true,
    actions: {
        async DELETE(context, query){
            const data = await request(context, "/room"+query, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/room"+query, "GET")
            return data
        }
    },
    mutations: {
        SET_ROOMS(state, payload){
            payload.map(room => {
                if(!state.ROOMS.find(state_room => state_room.id === room.id))
                    state.ROOMS[state.ROOMS.length] = room
            })
        },
        SET_ONE(state, payload){
            if(!state.ROOMS.find(room => payload.id === room.id)){
                state.ROOMS.unshift(payload)
            }
        },
        SET_FIRS(state, payload){
            state.ROOMS.map((room, index) => {
                if(room.id === payload.id) {
                    state.ROOMS.splice(index, 1);
                    state.ROOMS.unshift(room);
                }
            })
        }
    },
    state: {
        ROOMS: [],
        RECEIVED: false
    }
}

export default room