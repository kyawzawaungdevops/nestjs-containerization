import { EGender, IUser } from '../../common';
import { UserTransformer } from './user.transformer';
import { v4 as uuidv4 } from 'uuid';

describe('UserTransformer', () => {
  describe('transformerToUser', () => {
    it('should transform UserDocument to IUser correctly', () => {
      const userAddressDocument = {
        country: 'Thailand',
        city: 'Bangkok',
      };

      const userDocument = {
        _id: uuidv4(),
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        joinedDate: new Date('2021-01-01').toISOString(),
        userAddress: userAddressDocument,
      };

      const expectedUser: IUser = {
        id: expect.any(String),
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        joinedDate: new Date('2021-01-01').toISOString(),
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      // Act
      const result = UserTransformer.transformerToUser(userDocument);

      // Assert
      expect(result).toEqual(expectedUser);
    });
  });
});
