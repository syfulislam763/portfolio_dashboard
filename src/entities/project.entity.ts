import { 
  Entity, 
  ObjectIdColumn, 
  Column, 
  ObjectId 
} from 'typeorm';

interface Technology {
  name: string;
}

interface Feature {
  name: string;
}

@Entity('projects')
export class Project {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ nullable: true })
  githubFrontend: string;

  @Column({ nullable: true })
  githubBackend: string;

  @Column({ nullable: true })
  liveUrl: string;

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  userId: ObjectId;

  @Column(() => Array)
  technologies: Technology[];

  @Column(() => Array)
  features: Feature[];
}
