import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { LogInRequest } from './login.request';
import { LogInResponse } from './login.response';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { Organization, OrganizationDocument } from './organization/organization.entity';

describe('LoginService', () => {
  let service: LoginService;
  let userModel: Model<UserDocument>;
  let organizationModel: Model<OrganizationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
          }
        },
        {
          provide: getModelToken(Organization.name),
          useValue: {
            findOne: jest.fn(),
          }
        },
      ],
    }).compile();
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    organizationModel = module.get<Model<OrganizationDocument>>(getModelToken(Organization.name));
    service = module.get<LoginService>(LoginService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('logIn', () => {
    // it('should login a user when the form is filled correctly and the user is registered', async () => {
    //   const logInRequest: LogInRequest = new LogInRequest();
    //   logInRequest.email = 'pepe@gmail.com';
    //   logInRequest.password = 'pepe1234';

    //   const logInResponseMock: LogInResponse = new LogInResponse();
    //   logInResponseMock.userId = new mongoose.Types.ObjectId();
    //   logInResponseMock.email = logInRequest.email;
    //   logInResponseMock.name = 'pepe';
    //   logInResponseMock.organizationId = new mongoose.Types.ObjectId();
    //   logInResponseMock.organizationName = 'pepe-organization';

    //   jest.spyOn(service, 'logIn').mockResolvedValue(logInResponseMock);

    //   const logInResponseService: LogInResponse = await service.logIn(logInRequest);

    //   expect(logInResponseService.email).toEqual(logInRequest.email);
    //   expect(logInResponseService.userId).toBeDefined();
    //   expect(logInResponseService.name).toEqual('pepe');
    //   expect(logInResponseService.organizationId).toBeDefined();
    //   expect(logInResponseService.organizationName).toEqual('pepe-organization');
    // });

    it('should login a user when the form is filled correctly and the user is registered', async () => {
      const logInRequest: LogInRequest = {
        email: 'pepe@gmail.com',
        password: 'pepe1234',
      };

      const userModelMock = {
        _id: new mongoose.Types.ObjectId(),
        email: logInRequest.email,
        name: 'pepe',
        password: 'pepe1234',
        organizationId: new mongoose.Types.ObjectId(),
        organizationName: 'pepe-organization',
      };

      const organizationMock = {
        _id: userModelMock.organizationId,
        name: userModelMock.organizationName
      }

      jest.spyOn(userModel, 'findOne').mockResolvedValue(userModelMock);
      jest.spyOn(organizationModel, 'findById').mockResolvedValue(organizationMock);

      const logInResponse: LogInResponse = await service.logIn(logInRequest);

      expect(logInResponse.email).toEqual(logInRequest.email);
      expect(logInResponse.userId).toEqual(userModelMock._id);
      expect(logInResponse.name).toEqual(userModelMock.name);
      expect(logInResponse.organizationId).toEqual(userModelMock.organizationId);
      expect(logInResponse.organizationName).toEqual(userModelMock.organizationName);
      expect(service.logIn).toHaveBeenCalledWith(logInRequest)
    });
  });




});
