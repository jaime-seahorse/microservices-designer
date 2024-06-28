import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { getModelToken, } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.entity';
import mongoose, { Model } from 'mongoose';
import { Organization, OrganizationDocument, } from '../organization/organization.entity';
import { IOrganizationTest, IUserTest } from '../user.interface';

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
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          }
        },
        {
          provide: organizationModelToken,
          useValue: {
            save: jest.fn(),
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


  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });


  describe('SignIn', () => {
    it('should signin a new user and create an organization (The user fills good the form to sign in)', async () => {
      const sigInRequest: SignInRequest = {
        name: 'pepe',
        email: 'pepe@gmail.com',
        password: 'pepe1234',
        organizationName: 'pepe-organization'
      }

      const userId = new mongoose.Types.ObjectId();
      const organizationId = new mongoose.Types.ObjectId();

      const organization = new Organization();
      organization.name = sigInRequest.organizationName;
      organization.projectIds = [];
      organization.userIds = [userId];

      const user = new User();
      user.name = sigInRequest.name;
      user.email = sigInRequest.email;
      user.password = sigInRequest.password;
      user.organizationId = organizationId;

      const userDocumentMock = {
        _id: userId,
        email: user.email,
        name: user.name,
        password: user.password,
        organizationId: organizationId,
      };

      const organizationDocumentMock = {
        _id: organizationId,
        name: organization.name,
        projectIds: [],
        userIds: [userId],
      };

      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;

      jest.spyOn(userModel, 'findOne').mockResolvedValue(false);
      jest.spyOn(organizationModel, 'findOne').mockResolvedValue(false);
      saveSpy = jest.spyOn(userModel.prototype, 'save').mockResolvedValue(userDocumentMock)
      saveSpy = jest.spyOn(organizationModel.prototype, 'save').mockResolvedValue(organizationDocumentMock)

      const signInResponse: SignInResponse = await service.signIn(sigInRequest);
      expect(signInResponse.name).toEqual(userDocumentMock.name);
      // expect()
    });


    //   it('should exists a user (The user fills good the form but user or organization exist in database)', async () => {
    //     const signInRequest: SignInRequest = new SignInRequest();
    //     signInRequest.email = "pepe@mail.com";
    //     signInRequest.name = "Pepe";
    //     signInRequest.password = "changeme";
    //     signInRequest.organizationName = "PepeOrganization";

    //     const mockError: Error = {
    //       name: '',
    //       message: 'This email already exists',
    //     }
    //     try {
    //       jest.spyOn(service, 'signIn').mockRejectedValueOnce(mockError);
    //       await service.signIn(signInRequest);
    //     } catch (error) {
    //       console.log(error);
    //       expect(error.message).toEqual(mockError.message);
    //       expect(typeof error).toBe(typeof mockError)
    //     }
    //   });

    //   it('should exists a user (The user fills good the form but user or organization exist in database)', async () => {
    //     const signInRequest: SignInRequest = new SignInRequest();
    //     signInRequest.email = "pepe@mail.com";
    //     signInRequest.name = "Pepe";
    //     signInRequest.password = "changeme";
    //     signInRequest.organizationName = "PepeOrganization";

    //     const mockError: Error = {
    //       name: '',
    //       message: 'This organization already exists',
    //     }
    //     try {
    //       jest.spyOn(service, 'signIn').mockRejectedValueOnce(mockError);
    //       await service.signIn(signInRequest);
    //     } catch (error) {
    //       console.log(error);
    //       expect(error.message).toEqual(mockError.message);
    //       expect(typeof error).toBe(typeof mockError)
    //     }
    //   })
  });

});
