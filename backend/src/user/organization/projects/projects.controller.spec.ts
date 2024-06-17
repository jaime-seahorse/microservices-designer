import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { CreateProjectService } from './create-project/create-project.service';
import { CreateProjectRequest } from './create-project/create-project-request.dto';
import { CreateProjectResponse } from './create-project/create-project-response.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const mockProjectService = {
    create: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: CreateProjectService,
          useValue: mockProjectService
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

      jest.spyOn(mockProjectService, 'create').mockReturnValue(createProjectRequest);

      const createProjectResponse: CreateProjectResponse = await controller.create(createProjectRequest, 1);
      expect(mockProjectService.create).toHaveBeenCalled();
      expect(mockProjectService.create).toHaveBeenCalledWith(createProjectRequest, 1)
      expect(createProjectRequest.name).toEqual(createProjectResponse.name);
    })
  });
});
