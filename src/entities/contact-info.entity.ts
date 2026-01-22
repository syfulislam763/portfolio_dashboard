import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

@Entity('contact_infos')
export class ContactInfo {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  contact: string;

  @Column()
  userId: ObjectId;
}