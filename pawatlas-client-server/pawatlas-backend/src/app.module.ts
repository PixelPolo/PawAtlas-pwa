import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RolesModule } from './api/roles/roles.module';
import { UsersModule } from './api/users/users.module';
import { LikesModule } from './api/likes/likes.module';
import { TypesModule } from './api/types/types.module';
import { ImagesModule } from './api/images/images.module';
import { MarkersModule } from './api/markers/markers.module';
import { ContactsModule } from './api/contacts/contacts.module';
import { AddressesModule } from './api/addresses/addresses.module';
import { DatabaseModule } from './common/database/database.module';
import { FirebaseGuard } from './auth/firebase-guard/firebase.guard';
import { CategoriesModule } from './api/categories/categories.module';
import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './auth/firebase-admin/firebase-admin.service';
import { AnimalsModule } from './api/animals/animals.module';
import { VeterinariansModule } from './api/veterinarians/veterinarians.module';
import { WeightsModule } from './api/weights/weights.module';
import { SizesModule } from './api/sizes/sizes.module';
import { VaccinesModule } from './api/vaccines/vaccines.module';
import { VermifugesModule } from './api/vermifuges/vermifuges.module';
import { DiseasesModule } from './api/diseases/diseases.module';
import { UserAnimalOwnershipsModule } from './api/user_animal_ownerships/user_animal_ownerships.module';
import { AnimalEventsModule } from './api/animal_events/animal_events.module';
import { GendersModule } from './api/genders/genders.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    MarkersModule,
    LikesModule,
    CategoriesModule,
    ImagesModule,
    TypesModule,
    ContactsModule,
    AddressesModule,
    ContactsModule,
    RolesModule,
    AnimalsModule,
    VeterinariansModule,
    WeightsModule,
    SizesModule,
    VaccinesModule,
    VermifugesModule,
    DiseasesModule,
    AnimalEventsModule,
    UserAnimalOwnershipsModule,
    GendersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseAdminService,
    { provide: APP_GUARD, useClass: FirebaseGuard },
  ],
})
export class AppModule {}
