import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

@Entity('skills')
export class Skill {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: true })
  role: string;

  @Column()
  name: string;

  @Column()
  userId: ObjectId;

  @Column({ nullable: true })
  aboutId: ObjectId;
}