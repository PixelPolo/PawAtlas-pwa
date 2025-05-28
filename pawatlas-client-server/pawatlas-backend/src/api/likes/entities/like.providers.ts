import { DataSource } from 'typeorm';
import { Like } from './like.entity';
import { DATA_SOURCE, LIKE_REPOSITORY } from 'src/common/constants';

export const likeProviders = [
  {
    provide: LIKE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Like),
    inject: [DATA_SOURCE],
  },
];
