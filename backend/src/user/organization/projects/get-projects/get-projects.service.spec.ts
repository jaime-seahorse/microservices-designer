import { Test, TestingModule } from '@nestjs/testing';
import { GetProjectsService } from './get-projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../project.entity';
import { Repository } from 'typeorm';
import { GetProjectsResponse } from './get-projects-response.dto';

describe('GetProjectsService', () => {
  let service: GetProjectsService;
  let projectRepository: Repository<Project>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProjectsService,
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<GetProjectsService>(GetProjectsService);
    projectRepository = module.get<Repository<Project>>(PROJECT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('project repository should be defined', () => {
    expect(projectRepository).toBeDefined();
  });

  describe('getProjects', () => {
    it('should return all projects by organizationId', async () => {
      const organizationId = 1; // Usa un organizationId específico para la llamada

      const getProjectsResponseMock: GetProjectsResponse[] = [
        {
          projectId: 1,
          projectName: 'pepe-project1'
        },
        {
          projectId: 2,
          projectName: 'pepe-project2'
        }
      ];

      jest.spyOn(service, 'getProjects').mockResolvedValue(getProjectsResponseMock);
      const getProjectsResponse: GetProjectsResponse[] = await service.getProjects(organizationId);

      expect(service.getProjects).toHaveBeenCalledWith(organizationId);
      expect(getProjectsResponse).toHaveLength(2);
      expect(getProjectsResponse[0].projectId).toEqual(1);
      expect(getProjectsResponse[0].projectName).toEqual('pepe-project1');
      expect(getProjectsResponse[1].projectId).toEqual(2);
      expect(getProjectsResponse[1].projectName).toEqual('pepe-project2');
    });
  });

});
