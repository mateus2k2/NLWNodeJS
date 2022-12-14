import {UserRepository} from "../repositories/UserRepository"
import {getCustomRepository, Repository} from "typeorm"
import { User } from "../entities/User"

class UserService {
        
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }

    async create(email: string) {
        const userExists = await this.usersRepository.findOne({
            email
        })

        if(userExists)
            return userExists
        
        const user = this.usersRepository.create({
            email
        })
        await this.usersRepository.save(user)

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
    
        return user;
      }
}

export { UserService }