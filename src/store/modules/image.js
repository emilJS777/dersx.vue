import request from "@/store/request";

const image = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/image"+body.query, "POST", body.form)
            return data
        },
        async DELETE(context, filename){
            const data = await request(context, "/image?filename="+filename, "DELETE")
            return data
        },
        async GET(context, filename){
            const data = await request(context, `/image?filename=${filename}`, "GET")
            return data
        }
    }
}

export default image