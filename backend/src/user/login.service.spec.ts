import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  // describe('LogIn', () => {
  //   it('should login a user', async () => {
  //     const signInRequest: SignInRequest = new SignInRequest();
  //     signInRequest.email = "pepe@mail.com";
  //     signInRequest.name = "Pepe";
  //     signInRequest.password = "changeme";
  //     signInRequest.organizationName = "PepeOrganization";

  //     const signInResponseMock: SignInResponse = new SignInResponse();
  //     signInResponseMock.email = "pepe@mail.com";
  //     signInResponseMock.name = "Pepe";
  //     signInResponseMock.id = 1;
  //     signInResponseMock.organizationName = "PepeOrganization";
      
  //     jest.spyOn(service, 'logIn').mockResolvedValue(signInResponseMock);
  //     let signInResponseService: SignInResponse = await service.signIn(signInRequest);
  //     expect(signInRequest.email).toEqual(signInResponseService.email);
  //     expect(signInRequest.name).toEqual(signInResponseService.name);
  //     expect(signInRequest.organizationName).toEqual(signInResponseService.organizationName);
  //     expect(signInRequest.password).toBeDefined();
  //     expect(1).toEqual(signInResponseService.id);
  //   });
  // });





});
