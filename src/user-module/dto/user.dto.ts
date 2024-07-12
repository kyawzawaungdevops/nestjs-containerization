import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { EGender, IUser, IUserAddress } from '../../common';

export class UserAddressDto implements IUserAddress {
  @ApiProperty({ required: false, description: 'First line of the address' })
  @IsOptional()
  @IsString()
  addressLineOne?: string;

  @ApiProperty({ required: false, description: 'Second line of the address' })
  @IsOptional()
  @IsString()
  addressLineTwo?: string;

  @ApiProperty({ required: false, description: 'Postal code' })
  @IsOptional()
  @IsNumber()
  postalCode?: number;

  @ApiProperty({ description: 'Country of residence' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'City of residence' })
  @IsString()
  city: string;
}

export class BaseUserDto implements IUser {
  @ApiProperty({ description: 'Id of the user' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: EGender, description: 'Gender of the user' })
  @IsEnum(EGender)
  gender: EGender;

  @ApiProperty({ description: 'Joined date of the user' })
  @IsDateString()
  joinedDate: string;

  @ApiProperty({ type: UserAddressDto, description: 'Address of the user' })
  userAddress: UserAddressDto;
}

export class CreateUserDto extends PickType(BaseUserDto, [
  'userName',
  'email',
  'firstName',
  'lastName',
  'gender',
  'userAddress',
]) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'ID of the user to be updated' })
  @IsString()
  id: string;
}

export class GetUserDto extends BaseUserDto {}

export class GetUsersDto {
  @ApiProperty({ type: [GetUserDto], description: 'List of users' })
  users: GetUserDto[];
}
