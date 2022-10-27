import request from "@/store/request";

const service = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/service", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/service?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, service_id){
            const data = await request(context, "/service?id="+service_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/service"+query, "GET")
            return data
        }
    }
}

export default service