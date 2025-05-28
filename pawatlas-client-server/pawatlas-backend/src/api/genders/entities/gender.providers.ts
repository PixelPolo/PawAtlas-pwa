import { DataSource } from 'typeorm';
import { Gender } from './gender.entity';
import { DATA_SOURCE, GENDER_REPOSITORY } from 'src/common/constants';

export const genderProviders = [
  {
    provide: GENDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Gender),
    inject: [DATA_SOURCE],
  },
];
