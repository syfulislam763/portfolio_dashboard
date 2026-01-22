import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

@Entity('abouts')
export class About {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ default: 0 })
  projectCompleted: number;

  @Column({ default: 0 })
  yearOfExperience: number;

  @Column({ default: 0 })
  jobCompleted: number;

  @Column({ nullable: true })
  introVideo: string;

  @Column()
  userId: ObjectId;
}