import { Animal } from 'src/api/animals/entities/animal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AnimalEvent {
  // animalEventID: Animal Event ID
  @PrimaryGeneratedColumn('uuid')
  animalEventID: string;

  // animalEventDate: Animal Event Date
  @Column({ type: 'date' })
  animalEventDate: Date;

  // animalEventDescription: Animal Event Description
  @Column({ type: 'varchar', length: 512 })
  animalEventDescription: string;

  // animalID : Animal ID
  @Column({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many animal events MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.animalEvents, {
    onDelete: 'CASCADE', // If an animal is deleted, the animal event is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the animal event is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
