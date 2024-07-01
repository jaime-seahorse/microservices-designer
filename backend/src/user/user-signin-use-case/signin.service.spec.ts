import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { getModelToken, } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.entity';
import mongoose, { Model, Query } from 'mongoose';
import { Organization, OrganizationDocument, } from '../organization/organization.entity';
import { IOrganizationTest, IUserTest } from '../user.interface.test';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('UsersService', () => {
  let service: SignInService;
  let userModel: Model<UserDocument>;
  const userModeltoken = getModelToken('User');
  let organizationModel: Model<OrganizationDocument>;
  const organizationModelToken = getModelToken('Organization');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        {
          provide: userModeltoken,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            exec: jest.fn(),
          }
        },
        {
          provide: organizationModelToken,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          }
        }
      ],

    }).compile();
    userModel = module.get<Model<UserDocument>>(userModeltoken);
    organizationModel = module.get<Model<OrganizationDocument>>(organizationModelToken);
    service = module.get<SignInService>(SignInService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('SignIn', () => {
    test('should signin a new user and create an organization (The user fills good the form to sign in)', async () => {
      const sigInRequest: SignInRequest = {
        name: "pepe",
        email: "pepe@gmail.com",
        password: "pepe1234",
        organizationName: "pepe-organization"
      }

      const userId = new mongoose.Types.ObjectId();
      const organizationId = new mongoose.Types.ObjectId();

      const userDocumentMock: IUserTest = {
        _id: userId,
        email: sigInRequest.email,
        name: sigInRequest.name,
        password: sigInRequest.password,
        organizationId: undefined,
      };

      const organizationDocumentMock: IOrganizationTest = {
        _id: organizationId,
        name: sigInRequest.organizationName,
        projectIds: [],
        userIds: [userId],
      };


      jest.spyOn(userModel, 'findOne').mockResolvedValue(false);
      jest.spyOn(organizationModel, 'findOne').mockResolvedValue(false);

      jest.spyOn(userModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(userDocumentMock as any))
      jest.spyOn(organizationModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(organizationDocumentMock as any))
      userDocumentMock.organizationId = organizationId;

      jest.spyOn(userModel, 'findOneAndUpdate').mockReturnValueOnce(
        createMock<Query<UserDocument, UserDocument>>({
          exec: jest.fn().mockResolvedValueOnce(userDocumentMock)
        }))

      const signInResponse: SignInResponse = await service.signIn(sigInRequest);
      console.log('siginnn: ', signInResponse)
      expect(signInResponse.name).toEqual(sigInRequest.name);
      expect(signInResponse.email).toEqual(sigInRequest.email);
      expect(signInResponse.organizationName).toEqual(sigInRequest.organizationName);
      expect(signInResponse.organizationId).toEqual(organizationId);
    });


    test('should exists a user (The user fills good the form but user or organization exist in database)', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";
      signInRequest.organizationName = "PepeOrganization";

      jest.spyOn(userModel, 'findOne').mockResolvedValue(true);
      jest.spyOn(organizationModel, 'findOne').mockResolvedValue(false);

      await expect(service.signIn(signInRequest)).rejects.toThrow(new ConflictException('This email already exists'));
    });

    test('should exists a organization (The user fills good the form but user or organization exist in database)', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";
      signInRequest.organizationName = "PepeOrganization";

      jest.spyOn(userModel, 'findOne').mockResolvedValue(false);
      jest.spyOn(organizationModel, 'findOne').mockResolvedValue(true);

      await expect(service.signIn(signInRequest)).rejects.toThrow(new ConflictException('This organization already exists'));


    })
  });

});
