import request from "@/store/request";


const restore_password = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/restore_password", "POST", body)
            return data
        },
        async UPDATE(context, body){
            const data = await request(context, "/restore_password?security_code="+body.security_code, "PUT", body.form)
            return data
        },
        async GET(context, query){
            const data = await request(context, "/restore_password"+query, "GET")
            return data
        }
    }
}

export default restore_password