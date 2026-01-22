import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

@Entity('questions')
export class Skill {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: true })
  question: string;

  @Column()
  answer: string;

  @Column()
  userId: ObjectId;
}