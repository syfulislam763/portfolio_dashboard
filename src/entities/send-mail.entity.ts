import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  CreateDateColumn, 
  ObjectId 
} from 'typeorm';

@Entity('send_mails')
export class SendMail {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  yourMail: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}