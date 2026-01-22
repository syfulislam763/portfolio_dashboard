import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

@Entity('experiences')
export class Experience {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  designation: string;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  userId: ObjectId;

  @Column({ nullable: true })
  aboutId: ObjectId;
}