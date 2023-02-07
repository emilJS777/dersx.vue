import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const WSocket = new VueSocketIO({
    debug: false,
    connection: SocketIO(process.env.WEB_SOCKET_URL, {
        extraHeaders: {
            Authorization: "bearer " + localStorage.getItem("access_token")
        }
    }), //options object is Optional
    vuex: {
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
    }
})


export default WSocket
