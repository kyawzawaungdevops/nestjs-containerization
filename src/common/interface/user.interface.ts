import { EGender } from '../enum';

export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: EGender;
  joinedDate: string;
  userAddress: IUserAddress;
}

export interface IUserAddress {
  addressLineOne?: string;
  addressLineTwo?: string;
  postalCode?: number;
  country: string;
  city: string;
}
