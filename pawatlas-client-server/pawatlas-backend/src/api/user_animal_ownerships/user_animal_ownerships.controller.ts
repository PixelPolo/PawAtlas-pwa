import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserAnimalOwnershipsService } from './user_animal_ownerships.service';
import { CreateUserAnimalOwnershipDto } from './dto/create-user_animal_ownership.dto';
import { UpdateUserAnimalOwnershipDto } from './dto/update-user_animal_ownership.dto';

@Controller('user-animal-ownerships')
export class UserAnimalOwnershipsController {
  constructor(
    private readonly userAnimalOwnershipsService: UserAnimalOwnershipsService,
  ) {}

  // POST /user-animal-ownerships
  @Post()
  create(@Body() createUserAnimalOwnershipDto: CreateUserAnimalOwnershipDto) {
    return this.userAnimalOwnershipsService.create(
      createUserAnimalOwnershipDto,
    );
  }

  // GET /user-animal-ownerships
  @Get()
  findAll() {
    return this.userAnimalOwnershipsService.findAll();
  }

  // GET /user-animal-ownerships/:uid/:aid
  @Get(':uid/:aid')
  findOne(@Param('uid') uid: string, @Param('aid', ParseUUIDPipe) aid: string) {
    return this.userAnimalOwnershipsService.findOne(uid, aid);
  }

  // GET /user-animal-ownerships/user/:uid/animals
  @Get('user/:uid/animals')
  findAnimalsForUser(@Param('uid') uid: string) {
    return this.userAnimalOwnershipsService.findAnimalsForUser(uid);
  }

  // GET /user-animal-ownerships/animal/:aid/users
  @Get('animal/:aid/users')
  findUsersForAnimal(@Param('aid', ParseUUIDPipe) aid: string) {
    return this.userAnimalOwnershipsService.findUsersForAnimal(aid);
  }

  // PATCH /user-animal-ownerships/:uid/:aid
  @Patch(':uid/:mid')
  update(
    @Param('uid') uid: string,
    @Param('aid', ParseUUIDPipe) aid: string,
    @Body() updateUserAnimalOwnershipDto: UpdateUserAnimalOwnershipDto,
  ) {
    return this.userAnimalOwnershipsService.update(
      uid,
      aid,
      updateUserAnimalOwnershipDto,
    );
  }

  // DELETE /user-animal-ownerships/:uid/:aid
  @Delete(':uid/:aid')
  remove(@Param('uid') uid: string, @Param('aid', ParseUUIDPipe) aid: string) {
    return this.userAnimalOwnershipsService.remove(uid, aid);
  }
}
