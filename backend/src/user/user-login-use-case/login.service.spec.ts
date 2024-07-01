import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { LogInRequest } from './login.request';
import { LogInResponse } from './login.response';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UserDocument } from '../user.entity';
import { OrganizationDocument } from '../organization/organization.entity';
import { IOrganizationTest, IUserTest, MongooseObjectId } from '../user.interface.test';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginService', () => {
  let service: LoginService;
  let userModel: Model<UserDocument>;
  const userModelToken = getModelToken('User');
  let organizationModel: Model<OrganizationDocument>;
  const organizationModelToken = getModelToken('Organization')

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: userModelToken,
          useValue: {
            findOne: jest.fn(),
          }
        },
        {
          provide: organizationModelToken,
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn()
          }
        },
      ],
    }).compile();
    userModel = module.get<Model<UserDocument>>(userModelToken);
    organizationModel = module.get<Model<OrganizationDocument>>(organizationModelToken);
    service = module.get<LoginService>(LoginService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('logIn', () => {

    test('should login a user when the form is filled correctly and the user is registered', async () => {
      const logInRequest: LogInRequest = {
        email: 'pepe@gmail.com',
        password: 'pepe1234',
      };

      const userModelMock: IUserTest = {
        _id: MongooseObjectId,
        email: logInRequest.email,
        name: 'pepe',
        password: 'pepe1234',
        organizationId: MongooseObjectId,
      };

      const organizationModelMock: IOrganizationTest = {
        _id: userModelMock.organizationId,
        name: 'pepe-organization',
        userIds: [userModelMock._id],
        projectIds: []
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(userModelMock);
      jest.spyOn(organizationModel, 'findById').mockResolvedValue(organizationModelMock);

      const logInResponse: LogInResponse = await service.logIn(logInRequest);

      expect(logInResponse.email).toEqual(logInRequest.email);
      expect(logInResponse.userId).toEqual(userModelMock._id);
      expect(logInResponse.name).toEqual(userModelMock.name);
      expect(logInResponse.organizationId).toEqual(organizationModelMock._id);
      expect(logInResponse.organizationName).toEqual(organizationModelMock.name);
      expect(userModel.findOne).toHaveBeenCalled();
      expect(organizationModel.findById).toHaveBeenCalled();
      expect(organizationModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findOne).toHaveBeenCalledTimes(1);
    });

    test('should not exists a user (The user fills correctly the form to log in and the user is not registered)', async () => {
      const logInRequest: LogInRequest = {
        email: 'pepe@gmail.com',
        password: 'pepe1234',
      };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(false);
      await expect(service.logIn(logInRequest))
        .rejects.toThrow(new UnauthorizedException('Email or password incorrect'))
    })

    test('should not exists a user (The user fills correctly the form to log in and the user is not registered)', async () => {
      const logInRequest: LogInRequest = {
        email: 'pepe@gmail.com',
        password: 'pepe1234',
      };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(false);
      await expect(service.logIn(logInRequest))
        .rejects.toThrow(new UnauthorizedException('Email or password incorrect'))
    })
  });




});
