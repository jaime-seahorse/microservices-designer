import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { Organization } from './organization/organization.entity';

describe('UsersService', () => {
  let service: SignInService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const ORGANIZATION_REPOSITORY_TOKEN = getRepositoryToken(Organization)
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
      
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: ORGANIZATION_REPOSITORY_TOKEN,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<SignInService>(SignInService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
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
