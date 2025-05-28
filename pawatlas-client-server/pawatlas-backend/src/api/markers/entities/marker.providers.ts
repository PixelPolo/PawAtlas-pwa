import { DataSource } from 'typeorm';
import { Marker } from './marker.entity';
import { DATA_SOURCE, MARKER_REPOSITORY } from 'src/common/constants';

export const markerProviders = [
  {
    provide: MARKER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Marker),
    inject: [DATA_SOURCE],
  },
];
