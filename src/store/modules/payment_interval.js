import request from "@/store/request";

const payment_interval = {
    namespaced: true,
    actions: {
        async GET(context, query){
            const data = await request(context, "/payment_interval"+query, "GET")
            return data
        }
    }
}

export default payment_interval