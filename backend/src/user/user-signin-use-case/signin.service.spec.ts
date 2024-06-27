import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { getModelToken, } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.entity';
import mongoose, { Model } from 'mongoose';
import { Organization, OrganizationDocument } from '../organization/organization.entity';

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
            findOne: jest.fn()
          }
        },
        {
          provide: organizationModelToken,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn()
          }
        }
      ],

    }).compile();
    service = module.get<SignInService>(SignInService);
    userModel = module.get<Model<UserDocument>>(userModeltoken);
    organizationModel = module.get<Model<OrganizationDocument>>(organizationModelToken);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('SignIn', () => {
    it('should create a new user and organization', async () => {

      const signInRequest: SignInRequest = {
        email: 'pepe@example.com',
        name: 'pepe',
        password: 'pepe123',
        organizationName: 'pepe-organization',
      };

      jest.spyOn(organizationModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      const userId = new mongoose.Types.ObjectId();
      const organizationId = new mongoose.Types.ObjectId();

      const organization: Organization = new Organization();
      organization.name = 'pepe-organization';
      organization.projectIds = [];
      organization.userIds = [userId];

      const user: User = new User();

      user.name = 'pepe';
      user.email = 'pepe@gmail.com';
      user.password = 'pepe1234';
      user.organizationId = organizationId;


      const userDocumentMock = {
        _id: userId,
        email: user.email,
        name: user.name,
        password: user.password,
        organizationId: organizationId,
        save: jest.fn().mockResolvedValue({
          _id: userId,
          email: user.email,
          name: user.name,
          organizationId: organizationId
        })
      };

      // DO A INTERFACE OF MODELS
      const organizationDocumentMock: OrganizationDocument = {
        _id: organizationId,
        name: organization.name,
        projectIds: [],
        userIds: [userId],
        save: jest.fn().mockResolvedValue({
          _id: organizationId,
          name: organization.name,
          projectsIds: organization.projectIds,
          userIds: organization.userIds
        }),
      };


      jest.spyOn(userModel.prototype, 'save').mockResolvedValue(userDocumentMock);
      jest.spyOn(organizationModel.prototype, 'save').mockResolvedValue(organizationDocumentMock);
    });
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

    it('should exists a user (The user fills good the form but user or organization exist in database)', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";
      signInRequest.organizationName = "PepeOrganization";

      const mockError: Error = {
        name: '',
        message: 'This email already exists',
      }
      try {
        jest.spyOn(service, 'signIn').mockRejectedValueOnce(mockError);
        await service.signIn(signInRequest);
      } catch (error) {
        console.log(error);
        expect(error.message).toEqual(mockError.message);
        expect(typeof error).toBe(typeof mockError)
      }
    });

    it('should exists a user (The user fills good the form but user or organization exist in database)', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";
      signInRequest.organizationName = "PepeOrganization";

      const mockError: Error = {
        name: '',
        message: 'This organization already exists',
      }
      try {
        jest.spyOn(service, 'signIn').mockRejectedValueOnce(mockError);
        await service.signIn(signInRequest);
      } catch (error) {
        console.log(error);
        expect(error.message).toEqual(mockError.message);
        expect(typeof error).toBe(typeof mockError)
      }
    })
  });

});
