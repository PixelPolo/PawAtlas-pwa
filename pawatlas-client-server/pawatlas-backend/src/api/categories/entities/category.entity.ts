import { Type } from 'src/api/types/entities/type.entity';
import { Marker } from 'src/api/markers/entities/marker.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Category {
  // categoryID : Category ID
  @PrimaryColumn({ type: 'varchar', length: 8 })
  categoryID: string;

  // typeID : Type ID
  @Column({ type: 'varchar', length: 8 })
  typeID: string;

  // categoryName : Category name (e.g. 'veterinary' or 'toxic')
  @Column({ type: 'varchar', length: 64 })
  categoryName: string;

  // categoryDescription : Category description
  @Column({ type: 'varchar', length: 512 })
  categoryDescription: string;

  // ***** CONSTRAINTS *****

  // Many category MUST have one type
  @ManyToOne(() => Type, (type) => type.categories, {
    onDelete: 'RESTRICT', // Prevent deletion of a type if it is assigned to a category
    onUpdate: 'CASCADE', // If a type is updated, all its categories are updated
  })
  @JoinColumn({ name: 'typeID' })
  type: Type;

  // Many marker MUST have one category
  @OneToMany(() => Marker, (marker) => marker.category)
  markers: Marker[];
}
