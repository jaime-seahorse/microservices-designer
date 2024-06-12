import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';

describe('UsersService', () => {
  let service: SignInService;

  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignInService],
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
    service = module.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a user', () => {
    it('should create a new user', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changme";
  
        const signInResponse: SignInResponse = await service.signIn(signInRequest);
        
        expect(signInRequest.email).toEqual(signInResponse.email);
        expect(signInRequest.name).toEqual(signInResponse.name);
        expect(signInRequest.password).toEqual(signInResponse.password);
    });
  });
  



});
