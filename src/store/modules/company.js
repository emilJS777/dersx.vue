import request from "@/store/request";

const category = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/company", "POST", body)
            return data
        },
        async UPDATE(context, body){
            const data = await request(context, "/company?id="+body.id, "PUT", body.form)
            return data
        },
        async DELETE(context, company_id){
            const data = await request(context, "/company?id="+company_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/company"+query, "GET")
            return data
        }
    }
}

export default category