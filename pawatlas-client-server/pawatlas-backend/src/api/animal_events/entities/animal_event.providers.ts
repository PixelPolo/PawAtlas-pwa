import { ANIMAL_EVENT_REPOSITORY, DATA_SOURCE } from "src/common/constants";
import { DataSource } from "typeorm";
import { AnimalEvent } from "./animal_event.entity";

export const animalEventProviders = [
  {
    provide: ANIMAL_EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AnimalEvent),
    inject: [DATA_SOURCE],
  },
];
