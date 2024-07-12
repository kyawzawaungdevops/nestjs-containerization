import { User } from '../schema/user.schema';
import { IUser } from 'src/common';

export class UserTransformer {
  static transformerToUser(userDocument: User): IUser | null {
    if (!userDocument) {
      return null;
    }
    return {
      id: userDocument._id.toString(),
      userName: userDocument.userName,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      gender: userDocument.gender,
      joinedDate: userDocument.joinedDate,
      userAddress: userDocument.userAddress,
    };
  }
}
