import request from "@/store/request";

const lang = {
    namespaced: true,
    actions: {
        async GET(context, query){
            const data = await request(context, `/lang${query}`, "GET")
            context.commit("SET_LANG", JSON.parse(data.obj))
            return data
        }
    },
    mutations: {
        SET_LANG(state, payload){
            state.LANG = payload
        }
    },
    state: {
        LANG: null
    }
}

export default lang