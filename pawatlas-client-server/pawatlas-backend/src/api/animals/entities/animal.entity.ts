import { Disease } from 'src/api/diseases/entities/disease.entity';
import { Size } from 'src/api/sizes/entities/size.entity';
import { Vaccine } from 'src/api/vaccines/entities/vaccine.entity';
import { Vermifuge } from 'src/api/vermifuges/entities/vermifuge.entity';
import { Veterinarian } from 'src/api/veterinarians/entities/veterinarian.entity';
import { Weight } from 'src/api/weights/entities/weight.entity';
import { Image } from 'src/api/images/entities/image.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnimalOwnership } from 'src/api/user_animal_ownerships/entities/user_animal_ownership.entity';
import { AnimalEvent } from 'src/api/animal_events/entities/animal_event.entity';
import { Gender } from 'src/api/genders/entities/gender.entity';

@Entity()
export class Animal {
  // animalID : Animal ID
  @PrimaryGeneratedColumn('uuid')
  animalID: string;

  // chipNumber : Animal chip number
  @Column({ type: 'varchar', length: 128, nullable: true })
  chipNumber: string;

  // animalName : Animal name
  @Column({ type: 'varchar', length: 128 })
  animalName: string;

  // animalBirthName : Animal birth name
  @Column({ type: 'varchar', length: 128, nullable: true })
  animalBirthName: string;

  // animalBirthDate : Animal birth date
  @Column({ type: 'date' })
  animalBirthDate: Date;

  // animalType : Animal type
  @Column({ type: 'varchar', length: 128 })
  animalType: string;

  // animalBreed : Animal breed
  @Column({ type: 'varchar', length: 128 })
  animalBreed: string;

  // genderID : gender ID
  @Column({ type: 'varchar', length: 8 })
  genderID: string;

  // animalColor : Animal color
  @Column({ type: 'varchar', length: 128 })
  animalColor: string;

  // animalDescription : Animal description
  @Column({ type: 'varchar', length: 512, nullable: true })
  animalDescription: string;

  // sterile : Animal sterile
  @Column({ type: 'boolean' })
  sterile: boolean;

  // humanFriendly : Animal human friendly
  @Column({ type: 'boolean' })
  humanFriendly: boolean;

  // animalFriendly : Animal animal friendly
  @Column({ type: 'boolean' })
  animalFriendly: boolean;

  // allergies : Animal allergies
  @Column({ type: 'varchar', length: 512, nullable: true })
  allergies: string;

  // imageID : Image ID
  @Column({ type: 'uuid', nullable: true })
  imageID: string;

  // veterinarianID : Animal veterinarian ID
  @Column({ type: 'uuid', nullable: true })
  veterinarianID: string;

  // ***** CONSTRAINTS *****

  // Many animal MUST have one gender
  @ManyToOne(() => Gender, (gender) => gender.animals, {
    onDelete: 'RESTRICT', // Prevent deletion of a gender if it is assigned to a animal
    onUpdate: 'CASCADE', // If a gender is updated, all its animals are uptaded
  })
  @JoinColumn({ name: 'genderID' })
  gender: Gender;

  // Many animal COULD have one veterinarian
  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.animals, {
    onDelete: 'SET NULL', // If a veterinarian is deleted, the animal is not deleted
    onUpdate: 'CASCADE', // If a veterinarian is updated, the animal is updated
  })
  @JoinColumn({ name: 'veterinarianID' })
  veterinarian: Veterinarian;

  // Many weights MUST have one animal
  @OneToMany(() => Weight, (weight) => weight.animal)
  weights: Weight[];

  // Many sizes MUST have one animal
  @OneToMany(() => Size, (size) => size.animal)
  sizes: Size[];

  // Many vaccines MUST have one animal
  @OneToMany(() => Vaccine, (vaccine) => vaccine.animal)
  vaccines: Vaccine[];

  // Many vermifuges MUST have one animal
  @OneToMany(() => Vermifuge, (vermifuge) => vermifuge.animal)
  vermifuges: Vermifuge[];

  // Many diseases MUST have one animal
  @OneToMany(() => Disease, (disease) => disease.animal)
  diseases: Disease[];

  // Many animal events MUST have one animal
  @OneToMany(() => AnimalEvent, (animalEvent) => animalEvent.animal)
  animalEvents: AnimalEvent[];

  // One animal COULD have one image
  @OneToOne(() => Image, (image) => image.animal, {
    onDelete: 'SET NULL', // If an image is deleted, the animal is not deleted
    onUpdate: 'CASCADE', // If an image is updated, the animal is updated
  })
  @JoinColumn({ name: 'imageID' })
  image: Image;

  // Many userAnimalOwnership MUST have one animal
  @OneToMany(
    () => UserAnimalOwnership,
    (userAnimalOwnership) => userAnimalOwnership.animal,
  )
  userAnimalOwnerships: any;
}
