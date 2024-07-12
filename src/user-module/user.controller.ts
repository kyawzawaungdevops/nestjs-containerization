// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUser } from 'src/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ description: 'Create a user' })
  @ApiCreatedResponse()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update a user' })
  @ApiAcceptedResponse()
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    updateUserDto.id = id;
    return this.userService.update(updateUserDto);
  }

  @Get()
  @ApiOperation({ description: 'Get all users' })
  @ApiOkResponse()
  async getUsers(): Promise<IUser[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ description: 'Query user by Id' })
  @ApiOkResponse()
  async getUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete user by Id' })
  @ApiNoContentResponse()
  async deleteUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.deleteUser(id);
  }
}
