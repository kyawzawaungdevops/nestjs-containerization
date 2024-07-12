import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, Connection, connect } from 'mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import configuration from '../config/configuration';
import { EGender } from '../common';

describe('UserService', () => {
  let service: UserService;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('database.uri'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    const configService = module.get<ConfigService>(ConfigService);
    const uri = configService.get<string>('database.uri');
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
  });

  afterAll(async () => {
    await mongoConnection.close(true);
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      const result = await service.create(createUserDto);

      expect(result).toMatchObject({
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: 'male',
        joinedDate: expect.any(String),
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      });
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      const createdUser = await service.create(createUserDto);

      const updateUserDto: UpdateUserDto = {
        id: createdUser.id.toString(),
        userName: 'john_updated',
        firstName: 'John',
        lastName: 'Dane',
        email: 'john.dane@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      const result = await service.update(updateUserDto);

      expect(result).toMatchObject({
        userName: 'john_updated',
        firstName: 'John',
        lastName: 'Dane',
        email: 'john.dane@example.com',
        gender: 'male',
        joinedDate: expect.any(String),
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      });
    });
  });

  describe('getUser', () => {
    it('should return an array of users', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      const createdUser = await service.create(createUserDto);

      const result = await service.getUser(createdUser.id);

      expect(result).toMatchObject(createUserDto);
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const createUserDto1: CreateUserDto = {
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      const createUserDto2: CreateUserDto = {
        userName: 'jane_doe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      await service.create(createUserDto1);
      await service.create(createUserDto2);

      const result = await service.getUsers();

      expect(result).toHaveLength(2);
    });
  });

  describe('deleteUser', () => {
    it('should return an array of users', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: EGender.MALE,
        userAddress: {
          country: 'Thailand',
          city: 'Bangkok',
        },
      };

      const createdUser = await service.create(createUserDto);

      await service.deleteUser(createdUser.id);

      const deletedUser = await service.getUser(createdUser.id);

      expect(deletedUser).toEqual(null);
    });
  });
});
