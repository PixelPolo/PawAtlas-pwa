import { Animal } from 'src/api/animals/entities/animal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vaccine {
  // vaccineID : Vaccine ID
  @PrimaryGeneratedColumn('uuid')
  vaccineID: string;

  // vaccineDate : Vaccine date
  @Column({ type: 'date' })
  vaccineDate: Date;

  // vaccineName : Vaccine name
  @Column({ type: 'varchar', length: 128 })
  vaccineName: string;

  // animalID : Animal ID
  @Column({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many vaccines MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.vaccines, {
    onDelete: 'CASCADE', // If an animal is deleted, the vaccine is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the vaccine is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
