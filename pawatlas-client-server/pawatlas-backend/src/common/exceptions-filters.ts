import { HttpException, HttpStatus } from '@nestjs/common';

// ***** USER EXCEPTIONS *****

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class DisplayNameTakenException extends HttpException {
  constructor() {
    super('Display Name already taken', HttpStatus.BAD_REQUEST);
  }
}

// ***** ROLE EXCEPTIONS *****

export class RoleNotFoundException extends HttpException {
  constructor() {
    super('Role not found', HttpStatus.NOT_FOUND);
  }
}

// ***** CONTACT EXCEPTIONS *****

export class ContactNotFoundException extends HttpException {
  constructor() {
    super('Contact not found', HttpStatus.NOT_FOUND);
  }
}

// ***** ADDRESS EXCEPTIONS *****

export class AddressNotFoundException extends HttpException {
  constructor() {
    super('Address not found', HttpStatus.NOT_FOUND);
  }
}

// ***** TYPE EXCEPTIONS *****

export class TypeNotFoundException extends HttpException {
  constructor() {
    super('Type not found', HttpStatus.NOT_FOUND);
  }
}

// ***** CATEGORY EXCEPTIONS *****

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super('Category not found', HttpStatus.NOT_FOUND);
  }
}

// ***** MARKER EXCEPTIONS *****

export class MarkerNotFoundException extends HttpException {
  constructor() {
    super('Marker not found', HttpStatus.NOT_FOUND);
  }
}

// ***** LIKE EXCEPTIONS *****

export class LikeNotFoundException extends HttpException {
  constructor() {
    super('Like not found', HttpStatus.NOT_FOUND);
  }
}

// ***** IMAGE EXCEPTIONS *****

export class ImageNotFoundException extends HttpException {
  constructor() {
    super('Image not found', HttpStatus.NOT_FOUND);
  }
}

// ***** ANIMAL EXCEPTIONS *****

export class AnimalNotFoundException extends HttpException {
  constructor() {
    super('Animal not found', HttpStatus.NOT_FOUND);
  }
}

// ***** VETERINARIAN EXCEPTIONS *****

export class VeterinarianNotFoundException extends HttpException {
  constructor() {
    super('Veterinarian not found', HttpStatus.NOT_FOUND);
  }
}

// ***** WEIGHT EXCEPTIONS *****

export class WeightNotFoundException extends HttpException {
  constructor() {
    super('Weight not found', HttpStatus.NOT_FOUND);
  }
}

// ***** SIZE EXCEPTIONS *****

export class SizeNotFoundException extends HttpException {
  constructor() {
    super('Size not found', HttpStatus.NOT_FOUND);
  }
}

// ***** VACCINE EXCEPTIONS *****

export class VaccineNotFoundException extends HttpException {
  constructor() {
    super('Vaccine not found', HttpStatus.NOT_FOUND);
  }
}

// ***** VERMIFUGE EXCEPTIONS *****

export class VermifugeNotFoundException extends HttpException {
  constructor() {
    super('Vermifuge not found', HttpStatus.NOT_FOUND);
  }
}

// ***** DISEASE EXCEPTIONS *****

export class DiseaseNotFoundException extends HttpException {
  constructor() {
    super('Disease not found', HttpStatus.NOT_FOUND);
  }
}

// ***** ANIMAL EVENT EXCEPTIONS *****

export class AnimalEventNotFoundException extends HttpException {
  constructor() {
    super('Animal Event not found', HttpStatus.NOT_FOUND);
  }
}

// ***** USER ANIMAL OWNERSHIP EXCEPTIONS *****

export class UserAnimalOwnershipNotFoundException extends HttpException {
  constructor() {
    super('User Animal Ownership not found', HttpStatus.NOT_FOUND);
  }
}

// ***** GENDER EXCEPTIONS *****

export class GenderNotFoundException extends HttpException {
  constructor() {
    super('Gender not found', HttpStatus.NOT_FOUND);
  }
}
