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
    }
}

export default room