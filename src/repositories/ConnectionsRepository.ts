import { Repository, EntityRepository } from "typeorm";
import { Connections } from "../entities/Connections";

@EntityRepository(Connections)
class ConnectionssRepository extends Repository<Connections>{}

export {ConnectionssRepository};