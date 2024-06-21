import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { SignInService } from './signin/signin.service';
import { SignInRequest } from './signin/signin-request.dto';
import { SignInResponse } from './signin/signin-response.dto';
import { CreateProjectResponse } from './organization/projects/create-project/create-project-response.dto';
import { CreateProjectRequest } from './organization/projects/create-project/create-project-request.dto';
import { CreateProjectService } from './organization/projects/create-project/create-project.service';
import { PrintProjectsService } from './organization/projects/print-projects/print-projects.service';
import { PrintProjectsResponse } from './organization/projects/print-projects/print-projects-response.dto';
import { LogInRequest } from './login/login.request';
import { LogInResponse } from './login/login.response';
import { LoginService } from './login/login.service';


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
      logInResponseMock.id = 1;
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

  describe('printProjects', () => {
    it('should return all projects by organization', async () => {
      const printProjectsResponseMock: PrintProjectsResponse[] = [
        {
          projectId: 1,
          projectName: 'pepe1'
        },
        {
          projectId: 2,
          projectName: 'pepe2'
        },
      ];

      jest.spyOn(printProjectsServiceMock, 'printProjects').mockResolvedValue(printProjectsResponseMock);

      const printProjectsResponse: PrintProjectsResponse[] = await controller.printProjects(1);

      expect(printProjectsServiceMock.printProjects).toHaveBeenCalled();
      expect(printProjectsServiceMock.printProjects).toHaveBeenCalledWith(1);
      expect(printProjectsResponse).toEqual(printProjectsResponseMock);
    })
    it('should return a void array', async () => {

    });

  });

  

});
