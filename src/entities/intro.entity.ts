import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

@Entity('intros')
export class Intro {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: true })
  image: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({nullable: true, type: 'binary' })
  file: Buffer;

  @Column()
  userId: ObjectId;
}