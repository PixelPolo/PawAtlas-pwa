import { DataSource } from 'typeorm';
import { Size } from './size.entity';
import { DATA_SOURCE, SIZE_REPOSITORY } from 'src/common/constants';

export const sizeProviders = [
  {
    provide: SIZE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Size),
    inject: [DATA_SOURCE],
  },
];
