import request from "@/store/request";

const email = {
    namespaced: true,
    actions: {
        async GET(context, query){
            const data = await request(context, "/email"+query, "GET")
            return data
        }
    }
}

export default email
