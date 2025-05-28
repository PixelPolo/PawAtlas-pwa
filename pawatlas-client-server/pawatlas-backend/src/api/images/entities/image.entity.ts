import { Animal } from 'src/api/animals/entities/animal.entity';
import { Marker } from 'src/api/markers/entities/marker.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  // imageID : Image ID
  @PrimaryGeneratedColumn('uuid')
  imageID: string;

  // imageData : Image data in base64 format
  @Column('bytea')
  imageData: Buffer;

  // imageMimeType : Image MIME type (e.g. 'image/jpeg' or 'image/png')
  @Column({ type: 'varchar', length: 64 })
  imageMimeType: string;

  // imageDate : Date and time of the image
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  imageDate: Date;

  // ***** CONSTRAINTS *****

  // One marker COULD have one image
  @OneToOne(() => Marker, (marker) => marker.image)
  marker: Marker;

  // One animal COULD have one image
  @OneToOne(() => Animal, (animal) => animal.image)
  animal: Animal;
}
