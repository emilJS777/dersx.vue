import request from "@/store/request";

const gender = {
    namespaced: true,
    actions: {
        async GET(context, query){
            const data = await request(context, "/gender"+query, "GET")
            return data
        }
    }
}

export default gender