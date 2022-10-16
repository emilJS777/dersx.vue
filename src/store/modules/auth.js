import request from "@/store/request";

const auth = {
    namespaced: true,
    actions: {
        async LOGIN(context, body){
            const data = await request(context, "/auth", "POST", body)
            if(data.success){
                localStorage.setItem("access_token", data.obj.access_token)
                location.reload()
            }
            return data
        },
        async LOGOUT(context){
            const data = await request(context, "/auth", "DELETE")
            return data
        },
        async GET_PROFILE(context){
            const data = await request(context, "/auth", "GET")
            return data
        }
    },
    mutations: {
        SET_PROFILE(state, payload){
            state.profile = payload
        }
    },
    state: {
        profile: null
    }
}

export default auth