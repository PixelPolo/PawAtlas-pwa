import { Animal } from 'src/api/animals/entities/animal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Size {
  // sizeID : Size ID
  @PrimaryGeneratedColumn('uuid')
  sizeID: string;

  // sizeDate : Size date
  @Column({ type: 'date' })
  sizeDate: Date;

  // sizeValue : Size value
  @Column({ type: 'float' })
  sizeValue: number;

  // animalID : Animal ID
  @Column({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many sizes MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.sizes, {
    onDelete: 'CASCADE', // If an animal is deleted, the size is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the size is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
