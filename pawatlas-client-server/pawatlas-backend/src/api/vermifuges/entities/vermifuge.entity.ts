import { Animal } from 'src/api/animals/entities/animal.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vermifuge {
  // vermifugeID : Vermifuge ID
  @PrimaryGeneratedColumn('uuid')
  vermifugeID: string;

  // vermifugeDate : Vermifuge date
  @Column({ type: 'date' })
  vermifugeDate: Date;

  // vermifugeName : Vermifuge name
  @Column({ type: 'varchar', length: 128 })
  vermifugeName: string;

  // animalID : Animal ID
  @Column({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many vermifuges MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.vermifuges, {
    onDelete: 'CASCADE', // If an animal is deleted, the vermifuge is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the vermifuge is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
