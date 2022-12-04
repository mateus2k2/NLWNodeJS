import {ConnectionssRepository} from "../repositories/ConnectionsRepository"
import {getCustomRepository, Repository} from "typeorm"
import {Connections} from "../entities/Connections"
import { connect } from "socket.io-client"

interface IConnectionsCreate{
    socket_id: string
    user_id: string
    admin_id?: string
    id?: string
}
class ConnectionssService  {
    private ConnectionssRepository: Repository<Connections>

    constructor(){
        this.ConnectionssRepository = getCustomRepository(ConnectionssRepository)
    }

    async create({socket_id, user_id, admin_id, id}: IConnectionsCreate) {
        const Connections = this.ConnectionssRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.ConnectionssRepository.save(Connections)
        
        return Connections;
    }

    async findByUserId(user_id: string){
        const Connections = await this.ConnectionssRepository.findOne({
            user_id,
        });
        
        return Connections
    }
    async findAllWithoutAdmin(){
        const connection = await this.ConnectionssRepository.find({
            where: {admin_id: null},
            relations: ["user"] 
        })
    }

    async findBySocketID(socket_id: string){
        const connection = await this.ConnectionssRepository.findOne({
            socket_id
        })

        return connection
    }

    async updateAdminID(user_id: string, admin_id: string){
        await this.ConnectionssRepository
        .createQueryBuilder()
        .update(Connections)
        .set({admin_id})
        .where("user_id = :user_id", {
            user_id,
        }).execute
    }
}

export { ConnectionssService }