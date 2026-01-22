

import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  CreateDateColumn, 
  ObjectId 
} from 'typeorm';

interface Keyword {
  name: string;
}

@Entity('posts')
export class Post {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: true })
  thumbnail: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  text: string;

  @Column()
  userId: ObjectId;

  @Column(() => Array)
  keywords: Keyword[];
}
