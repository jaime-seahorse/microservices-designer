import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { getModelToken, } from '@nestjs/mongoose';

describe('UsersService', () => {
  let service: SignInService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        {
          provide: getModelToken('User'),
          useValue: {}
        },
        {
          provide: getModelToken('Organization'),
          useValue: {}
        }
      ],

    }).compile();
    service = module.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('SignIn', () => {
    it('should signin a new user (The user fills good the form to sign in)', async () => {
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

    // it('should exists a user (The user fills good the form but user exist in database)', async () => {
    //   const signInRequest: SignInRequest = new SignInRequest();
    //   signInRequest.email = "pepe@mail.com";
    //   signInRequest.name = "Pepe";
    //   signInRequest.password = "changeme";
    //   signInRequest.organizationName = "PepeOrganization";

    //   jest.spyOn(service, 'signIn').mockRejectedValue;
    //   let signInResponseService: SignInResponse = await service.signIn(signInRequest);
    //   expect(signInResponseService).toThrow(new Error);
    // });
  });

});
