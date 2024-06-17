import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectService } from './create-project.service';
import { Repository } from 'typeorm'
import { Project } from '../project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProjectRequest } from './create-project-request.dto';
import { CreateProjectResponse } from './create-project-response.dto';

describe('CreateProjectService', () => {
  let service: CreateProjectService;
  let projectRepository: Repository<Project>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProjectService,
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {}
        }
      ],
    }).compile();
    service = module.get<CreateProjectService>(CreateProjectService);
    projectRepository = module.get<Repository<Project>>(PROJECT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('project repository should be defined', () => {
    expect(projectRepository).toBeDefined();
  });


  describe('createProject', () => {
    it('should be create a project', async () => {
      const createProjectRequest: CreateProjectRequest = new CreateProjectRequest();
      createProjectRequest.name = "pepe-project";

      const createProjectResponseMock: CreateProjectResponse = new CreateProjectResponse();
      createProjectResponseMock.projectId = 1;
      createProjectResponseMock.name = "pepe-project";

      jest.spyOn(service, 'create').mockResolvedValue(createProjectResponseMock);
      let createProjectResponseService: CreateProjectResponse = await service.create(createProjectRequest, 2);
      expect(createProjectRequest.name).toEqual(createProjectResponseService.name);
      expect(1).toEqual(createProjectResponseService.projectId);
      
    })
  })

});
