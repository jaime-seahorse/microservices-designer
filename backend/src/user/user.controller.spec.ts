import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { SignInService } from './signin/signin.service';
import { SignInRequest } from './signin/signin-request.dto';
import { SignInResponse } from './signin/signin-response.dto';
import { CreateProjectResponse } from './organization/projects/create-project/create-project-response.dto';
import { CreateProjectRequest } from './organization/projects/create-project/create-project-request.dto';
import { CreateProjectService } from './organization/projects/create-project/create-project.service';
import { GetProjectsService } from './organization/projects/get-projects/get-projects.service';
import { UpdateUserService } from './update-user/update-user-service.service';
import { GetProjectsResponse } from './organization/projects/get-projects/get-projects-response.dto';

describe('UsersController', () => {
  let controller: UserController;

  const signInServiceMock = {
    signIn: jest.fn(),
  }
  const updateUserServiceMock = {
    update: jest.fn(),
  }
  const createProjectServiceMock = {
    createProject: jest.fn(),
  }
  const getProjectsServiceMock = {
    getProjects: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: SignInService,
          useValue: signInServiceMock,
        },
        {
          provide: UpdateUserService,
          useValue: updateUserServiceMock
        },
        {
          provide: CreateProjectService,
          useValue: createProjectServiceMock
        },
        {
          provide: GetProjectsService,
          useValue: getProjectsServiceMock
        },

      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('signIn', () => {
    it('should sign in a user', async () => {
      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";
      signInRequest.organizationName = "pepe-organization";

      const signInResponseMock: SignInResponse = new SignInResponse();
      signInResponseMock.id = 1;
      signInResponseMock.email = signInRequest.email;
      signInResponseMock.name = signInRequest.name;
      signInResponseMock.organizationName = signInRequest.organizationName;

      jest.spyOn(signInServiceMock, 'signIn').mockResolvedValue(signInResponseMock);

      const signInResponse: SignInResponse = await controller.signIn(signInRequest);

      expect(signInServiceMock.signIn).toHaveBeenCalled();
      expect(signInServiceMock.signIn).toHaveBeenCalledWith(signInRequest);
      expect(signInResponse.email).toEqual(signInRequest.email);
      expect(signInResponse.name).toEqual(signInRequest.name);
    });
  });


  describe('createProject', () => {
    it('should create a new project', async () => {
      const createProjectRequest: CreateProjectRequest = new CreateProjectRequest();
      createProjectRequest.name = "pepe-project";

      const createProjectResponseMock: CreateProjectResponse = new CreateProjectResponse();
      createProjectResponseMock.projectId = 1;
      createProjectResponseMock.name = createProjectRequest.name;

      jest.spyOn(createProjectServiceMock, 'createProject').mockResolvedValue(createProjectResponseMock);
      const createProjectResponse: CreateProjectResponse = await controller.createProject(createProjectRequest, 1);
      console.log(createProjectResponse);

      expect(createProjectServiceMock.createProject).toHaveBeenCalled();
      expect(createProjectServiceMock.createProject).toHaveBeenCalledWith(createProjectRequest, 1)
      expect(createProjectRequest.name).toEqual(createProjectResponse.name);
    })
  });

  describe('getProjects', () => {
    it('should return all projects by organization', async () => {
      const getProjectsResponseMock: GetProjectsResponse[] = [
        {
          projectId: 1,
          projectName: 'pepe1'
        },
        {
          projectId: 2,
          projectName: 'pepe2'
        },
      ];

      jest.spyOn(getProjectsServiceMock, 'getProjects').mockResolvedValue(getProjectsResponseMock);

      const getProjectsResponse: GetProjectsResponse[] = await controller.getProjects(1);

      expect(getProjectsServiceMock.getProjects).toHaveBeenCalled();
      expect(getProjectsServiceMock.getProjects).toHaveBeenCalledWith(1);
      expect(getProjectsResponse).toEqual(getProjectsResponseMock);
    })
    it('should return a void array', async () => {

    });
    
  });


});
