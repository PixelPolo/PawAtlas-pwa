import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { DATA_SOURCE, USER_REPOSITORY } from 'src/common/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
