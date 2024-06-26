import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectService } from './create-project.service';
import { Repository } from 'typeorm'
import { CreateProjectRequest } from './create-project-request.dto';
import { CreateProjectResponse } from './create-project-response.dto';
import { Project } from './project.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('CreateProjectService', () => {
  let service: CreateProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProjectService,
        {
          provide: getModelToken('Project'),
          useValue: {}
        }
      ],
    }).compile();
    service = module.get<CreateProjectService>(CreateProjectService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('createProject', () => {
    it('should be create a project', async () => {
      const createProjectRequest: CreateProjectRequest = new CreateProjectRequest();
      createProjectRequest.name = "pepe-project";

      const createProjectResponseMock: CreateProjectResponse = new CreateProjectResponse();
      createProjectResponseMock.projectId = 1;
      createProjectResponseMock.name = "pepe-project";

      jest.spyOn(service, 'createProject').mockResolvedValue(createProjectResponseMock);
      let createProjectResponse: CreateProjectResponse = await service.createProject(createProjectRequest, 2);
      expect(createProjectRequest.name).toEqual(createProjectResponse.name);
      expect(1).toEqual(createProjectResponse.projectId);

    })
  })

});
