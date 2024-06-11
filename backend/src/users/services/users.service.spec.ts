import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { CreateUserResponse } from '../dto/create-user-response.dto';

describe('UsersService', () => {
  let service: UsersService;

  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
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
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a user', () => {
    it('should create a new user', async () => {
      const createUserRequest: CreateUserRequest = new CreateUserRequest();
        createUserRequest.email = "pepe@mail.com";
        createUserRequest.name = "Pepe";
        createUserRequest.password = "changme";
  
        const createUserResponse: CreateUserResponse = await service.create(createUserRequest);
        
        expect(createUserRequest.email).toEqual(createUserResponse.email);
        expect(createUserRequest.name).toEqual(createUserResponse.name);
        expect(createUserRequest.password).toEqual(createUserResponse.password);
    });
  });
  



});
