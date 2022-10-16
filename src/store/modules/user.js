import request from "@/store/request";

const user = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/user", "POST", body)
            return data
        },
        async UPDATE(context, body){
            const data = await request(context, "/user", "PUT", body)
            return data
        },
        async GET(context, query){
            const data = await request(context, "/user"+query, "GET")
            return data
        }
    }
}

export default user