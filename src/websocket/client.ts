import { io } from "../http"
import { ConnectionssService } from "../services/ConnectionsService"
import { UserService } from "../services/UserService"
import { MessagesService } from "../services/MessagesService"

interface IParams{
    text: string
    email: string
}

 io.on("connect", (socket) => {

    const connectionsService = new ConnectionssService()
    const userService = new UserService()
    const messagesService = new MessagesService()

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id
        const { text, email} = params as IParams
        let user_id = null

        const userExists = await userService.findByEmail(email)

        if(!userExists){
            const user = await userService.create(email)

            await connectionsService.create({
                socket_id,
                user_id: user.id
            })
            user_id = user.id
        }else {
            user_id = userExists.id
            const connection = await connectionsService.findByUserId(userExists.id)

            if(!connection){
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id,
                })
            }else{
                connection.socket_id = socket_id;
                await connectionsService.create(connection)
            }

            await connectionsService.create({
                socket_id,
                user_id: userExists.id
            })
        }

        await messagesService.create({
            text,
            user_id
        })

        const allMessagens = await messagesService.listByUser(user_id)

        socket.emit("client_list_all_messages", allMessagens)
        
    })

    // socket.on("client_send_to_admin", async (params) => {
    //     const {text, socket_admin_id} = params 
        
    //     const socket_id = socket.id

    //     const {user_id} = await connectionsService.findBySocketID(socket_id)

    //     const message = await messagesService.create({
    //         text,
    //         user_id
    //     })

    //     io.to(socket_admin_id).emit("admin_recive_message", {
    //         message,
    //         socket_id
    //     })
    // })
}) 