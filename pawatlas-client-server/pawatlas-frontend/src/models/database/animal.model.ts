export interface Animal {
  animalID?: string;
  chipNumber?: string;
  animalName: string;
  animalBirthName?: string;
  animalBirthDate: Date;
  animalType: string;
  animalBreed: string;
  genderID: string;
  animalColor: string;
  animalDescription?: string;
  sterile: boolean;
  humanFriendly: boolean;
  animalFriendly: boolean;
  allergies?: string;
  imageID?: string;
  veterinarianID?: string;
}
