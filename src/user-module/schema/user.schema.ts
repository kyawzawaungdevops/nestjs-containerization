import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EGender } from '../../common';

@Schema()
export class UserAddress {
  @Prop({ required: false })
  addressLineOne?: string;

  @Prop({ required: false })
  addressLineTwo?: string;

  @Prop({ required: false })
  postalCode?: number;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;
}

export type UserAddressDocument = UserAddress & Document;
export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: EGender })
  gender: EGender;

  @Prop({ required: true })
  joinedDate: string;

  @Prop({ type: UserAddressSchema, required: true })
  userAddress: UserAddress;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
