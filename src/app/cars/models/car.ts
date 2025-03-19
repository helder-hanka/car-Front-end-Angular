import { Color } from './color';
import { Garage } from './garage';
import { UserProfile } from './userProfile';

export class Car {
  id?: number;
  immatriculation!: string;
  marque!: string;
  modele!: string;
  annee!: Date;
  color!: Color;
  garage!: Garage;
  userProfile!: UserProfile;
}
