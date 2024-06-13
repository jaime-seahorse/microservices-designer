import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user-service.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateUserRequestDto } from './update-user-request.dto';

describe('UpdateUserServiceService', () => {
  let service: UpdateUserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserService],
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'seahorse',
          entities: ["dist/**/*.entity.js"],
          autoLoadEntities: true,
          synchronize: true,
        })
      ]
    }).compile();

    userRepository = module.get('UserRepository');
    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UpdateUser', () => {
    it('should be update a user', async () => {
      const updateUserRequest: UpdateUserRequestDto = new UpdateUserRequestDto();
      updateUserRequest.email = "pepe@mail.com";
      updateUserRequest.name = "Pepe";

      const createUserResponse: { message: string } = await service.update(1, updateUserRequest);

      expect(createUserResponse.message).toEqual('User updated successfully')
    })
  })
});
