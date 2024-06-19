import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProjectService } from './update-project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { UpdateProjectResponse } from './update-project-response.dto';
import { UpdateProjectRequest } from './update-project-request.dto';

describe('UpdateProjectService', () => {
  let service: UpdateProjectService;
  let projectRepository: Repository<Project>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProjectService,
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<UpdateProjectService>(UpdateProjectService);
    projectRepository = module.get<Repository<Project>>(PROJECT_REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('project repository should be defined', () => {
    expect(projectRepository).toBeDefined();
  });

  describe('updateProject', () => {
    it('should be update a project by id', async () => {
      const projectId = 1;
      const updateProjectRequest = new UpdateProjectRequest();
      updateProjectRequest.name = 'pepe-project';

      const updateProjectResponseMock = new UpdateProjectResponse();
      updateProjectResponseMock.id = projectId;
      updateProjectResponseMock.name = 'pepe-project2';

      jest.spyOn(service, 'updateProject').mockResolvedValue(updateProjectResponseMock);
      const updateProjectResponse: UpdateProjectResponse = await service.updateProject(projectId, updateProjectRequest)

      expect(service.updateProject).toHaveBeenCalledWith(projectId, updateProjectRequest);
      expect(updateProjectResponse.id).toEqual(projectId);
      expect(updateProjectResponse.name).toEqual('pepe-project2');
    })
  })
});
