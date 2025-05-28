import { Animal } from 'src/api/animals/entities/animal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Weight {
  // weightID : Weight ID
  @PrimaryGeneratedColumn('uuid')
  weightID: string;

  // weightDate : Weight date
  @Column({ type: 'date' })
  weightDate: Date;

  // weightValue : Weight value
  @Column({ type: 'float' })
  weightValue: number;

  // animalID : Animal ID
  @Column({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many weights MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.weights, {
    onDelete: 'CASCADE', // If an animal is deleted, the weight is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the weight is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
