import Axios from "axios";
const api_url = process.env.WEB_API

const request = (context, path, method, body, access=true) => {
    return Axios({
        url: api_url+path,
        method: method,
        data: body || {},
        headers: access ? {"Authorization": "Bearer " + localStorage.getItem("access_token"), "Lang": localStorage.getItem("lang")} : {},
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).then(data => data.data).catch(err => {
        // if(err.response.status === 401 && access || err.response.status === 422 && access)
        //     return REFRESH({path, method, body})

        // if(err.response.status === 404)
        //     router.push({path: '/404', query: {msg: err.response.data.obj.msg}})

        return err.response.data
    })
}

export default request
