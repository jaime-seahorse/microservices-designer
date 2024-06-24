import { Test, TestingModule } from '@nestjs/testing';
import { PrintProjectsService } from './print-projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../project.entity';
import { Repository } from 'typeorm';
import { PrintProjectsResponse } from './print-projects-response.dto';

describe('GetProjectsService', () => {
  let service: PrintProjectsService;
  let projectRepository: Repository<Project>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrintProjectsService,
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<PrintProjectsService>(PrintProjectsService);
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

      const getProjectsResponseMock: PrintProjectsResponse[] = [
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
      const getProjectsResponse: PrintProjectsResponse[] = await service.getProjects(organizationId);

      expect(service.getProjects).toHaveBeenCalledWith(organizationId);
      expect(getProjectsResponse).toHaveLength(2);
      expect(getProjectsResponse[0].projectId).toEqual(1);
      expect(getProjectsResponse[0].projectName).toEqual('pepe-project1');
      expect(getProjectsResponse[1].projectId).toEqual(2);
      expect(getProjectsResponse[1].projectName).toEqual('pepe-project2');
    });
  });

});
