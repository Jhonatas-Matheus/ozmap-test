import { Column} from "typeorm";

import { Entity, PrimaryColumn } from "typeorm";


@Entity()
class UserTypeOrm{
    @PrimaryColumn("uuid")
    id!: string;
    @Column()
    name!: string
    @Column()
    age!: number;
    @Column()
    email!: string;
}

export default UserTypeOrm