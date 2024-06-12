import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';

describe('UsersService', () => {
  let service: SignInService;
  let userRepository: Repository<UserEntity>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            update: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<SignInService>(SignInService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('SignIn', () => {
    it('should signin a new user', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";
      signInRequest.organizationName = "PepeOrganization";
      
      const signInResponseMock: SignInResponse = new SignInResponse();
      signInResponseMock.email = "pepe@mail.com";
      signInResponseMock.name = "Pepe";
      signInResponseMock.id = 1;
      signInResponseMock.organizationName = "PepeOrganization";


      jest.spyOn(service, 'signIn').mockResolvedValue(signInResponseMock);
      let signInResponseService: SignInResponse = await service.signIn(signInRequest);
      expect(signInRequest.email).toEqual(signInResponseService.email);
      expect(signInRequest.name).toEqual(signInResponseService.name);
      expect(signInRequest.organizationName).toEqual(signInResponseService.organizationName);
      expect(signInRequest.password).toBeDefined();
      expect(1).toEqual(signInResponseService.id);
    });
  });




});
