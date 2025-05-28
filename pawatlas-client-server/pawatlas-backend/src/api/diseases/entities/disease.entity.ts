import { Animal } from 'src/api/animals/entities/animal.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Disease {
  // diseaseID : Disease ID
  @PrimaryGeneratedColumn('uuid')
  diseaseID: string;

  // diseaseDate : Disease date
  @Column({ type: 'date' })
  diseaseDate: Date;

  // diseaseDescription : Disease description
  @Column({ type: 'varchar', length: 512 })
  diseaseDescription: string;

  // animalID : Animal ID
  @Column({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many diseases MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.diseases, {
    onDelete: 'CASCADE', // If an animal is deleted, the disease is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the disease is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
