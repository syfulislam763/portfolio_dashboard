
import { 
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    ObjectId
 } from "typeorm";

 @Entity('users')
 export class User{
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({unique:true, nullable:false})
    email: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt:Date;
 }