import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { CreateProjectService } from './create-project/create-project.service';
import { CreateProjectRequest } from './create-project/create-project-request.dto';
import { CreateProjectResponse } from './create-project/create-project-response.dto';
import { GetProjectsRequest } from './get-projects/get-project-request.dto';
import { GetProjectsService } from './get-projects/get-projects.service';
import { GetProjectsResponse } from './get-projects/get-projects-response.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const createProjectServiceMock = {
    create: jest.fn(),
  }
  const getProjectsServiceMock = {
    getProjects: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: CreateProjectService,
          useValue: createProjectServiceMock
        },
        {
          provide: GetProjectsService,
          useValue: getProjectsServiceMock
        }
      ]
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      const createProjectRequest: CreateProjectRequest = new CreateProjectRequest();
      createProjectRequest.name = "pepe-project";

      const createProjectResponse: CreateProjectResponse = await controller.create(createProjectRequest, 1);
      jest.spyOn(createProjectServiceMock, 'create').mockReturnValue(createProjectResponse);

      expect(createProjectServiceMock.create).toHaveBeenCalled();
      expect(createProjectServiceMock.create).toHaveBeenCalledWith(createProjectRequest, 1)
      expect(createProjectRequest.name).toEqual(createProjectResponse.name);
    })
  });

  describe('getProjects', () => {
    it('should return all projects by organization', async () => {
      const getProjectsRequest: GetProjectsRequest = new GetProjectsRequest();
      getProjectsRequest.organizationId = 1;

      const getProjectsResponse: GetProjectsResponse[] = await controller.getProjects(getProjectsRequest, 1);
      jest.spyOn(getProjectsServiceMock, 'getProjects').mockReturnValue(getProjectsResponse);

      expect(getProjectsServiceMock.getProjects).toHaveBeenCalled();
      expect(getProjectsServiceMock.getProjects).toHaveBeenCalledWith(getProjectsRequest, 1);
      expect(createPro)

    })
  });
});
