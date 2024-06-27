import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { SignInService } from './user-signin-use-case/signin.service';
import { LogInRequest } from './user-login-use-case/login.request';
import { LogInResponse } from './user-login-use-case/login.response';
import { LoginService } from './user-login-use-case/login.service';
import { CreateProjectRequest } from './organization/project/create-project-request.dto';
import { CreateProjectResponse } from './organization/project/create-project-response.dto';
import { CreateProjectService } from './organization/project/create-project.service';
import { PrintProjectsResponse } from './organization/project/print-projects-response.dto';
import { PrintProjectsService } from './organization/project/print-projects.service';
import { SignInRequest } from './user-signin-use-case/signin-request.dto';
import { SignInResponse } from './user-signin-use-case/signin-response.dto';
import mongoose from 'mongoose';



describe('UsersController', () => {
  let controller: UserController;

  const signInServiceMock = {
    signIn: jest.fn(),
  }

  const createProjectServiceMock = {
    createProject: jest.fn(),
  }
  const printProjectsServiceMock = {
    printProjects: jest.fn(),
  }

  const loginServiceMock = {
    logIn: jest.fn(),
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
          provide: CreateProjectService,
          useValue: createProjectServiceMock
        },
        {
          provide: PrintProjectsService,
          useValue: printProjectsServiceMock
        },
        {
          provide: LoginService,
          useValue: loginServiceMock,
        }

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


  describe('logIn', () => {
    it('should logIn a user', async () => {

      const logInRequest: LogInRequest = new LogInRequest();
      logInRequest.email = "pepe@mail.com";
      logInRequest.password = "changeme";


      const logInResponseMock: LogInResponse = new LogInResponse();
      logInResponseMock.userId = new mongoose.Types.ObjectId();
      logInResponseMock.email = "pepe@mail.com";
      logInResponseMock.name = "pepe";


      jest.spyOn(loginServiceMock, 'logIn').mockResolvedValue(logInResponseMock);

      const logInResponse: LogInResponse = await controller.logiIn(logInRequest);

      expect(loginServiceMock.logIn).toHaveBeenCalled();
      expect(loginServiceMock.logIn).toHaveBeenCalledWith(logInRequest);
      expect(logInResponse.email).toEqual(logInRequest.email);
      expect(logInResponse.name).toEqual("pepe");
    });
  });


  describe('createProject', () => {
    it('should create a new project', async () => {
      const createProjectRequest: CreateProjectRequest = new CreateProjectRequest();
      createProjectRequest.name = "pepe-project";
      const projectId = new mongoose.Types.ObjectId();
      const createProjectResponseMock: CreateProjectResponse = new CreateProjectResponse();
      createProjectResponseMock.projectId = projectId;
      createProjectResponseMock.name = createProjectRequest.name;

      jest.spyOn(createProjectServiceMock, 'createProject').mockResolvedValue(createProjectResponseMock);
      const createProjectResponse: CreateProjectResponse = await controller.createProject(createProjectRequest, projectId);
      console.log(createProjectResponse);

      expect(createProjectServiceMock.createProject).toHaveBeenCalled();
      expect(createProjectServiceMock.createProject).toHaveBeenCalledWith(createProjectRequest, 1)
      expect(createProjectRequest.name).toEqual(createProjectResponse.name);
    })
  });

  describe('printProjects', () => {
    it('should return all projects by organization', async () => {
      const printProjectsResponseMock: PrintProjectsResponse[] = [
        {
          projectId: new mongoose.Types.ObjectId(),
          projectName: 'pepe1'
        },
        {
          projectId: new mongoose.Types.ObjectId(),
          projectName: 'pepe2'
        },
      ];

      jest.spyOn(printProjectsServiceMock, 'printProjects').mockResolvedValue(printProjectsResponseMock);

      const printProjectsResponse: PrintProjectsResponse[] = await controller.printProjects(printProjectsResponseMock[0].projectId);

      expect(printProjectsServiceMock.printProjects).toHaveBeenCalled();
      expect(printProjectsServiceMock.printProjects).toHaveBeenCalledWith(1);
      expect(printProjectsResponse).toEqual(printProjectsResponseMock);
    })
    it('should return a void array', async () => {

    });

  });


});
