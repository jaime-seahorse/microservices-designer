import { Test, TestingModule } from '@nestjs/testing';
import { PrintProjectsService } from './print-projects.service';
import { Repository } from 'typeorm';
import { PrintProjectsResponse } from './print-projects-response.dto';
import mongoose, { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.entity';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectDocument } from './project.schema';
import { find } from 'rxjs';

describe('GetProjectsService', () => {
  let service: PrintProjectsService;
  let projectModel = Model<ProjectDocument>;
  const projectModelToken = getModelToken('Project');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrintProjectsService,
        {
          provide: projectModelToken,
          useValue: {
            find: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<PrintProjectsService>(PrintProjectsService);
    projectModel = module.get<Model<ProjectDocument>>(projectModelToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('getProjects', () => {
    it('should return all projects by organizationId', async () => {
      const organizationId = 1; 

      const getProjectsResponseMock: PrintProjectsResponse[] = [
        {
          projectId: new mongoose.Types.ObjectId(),
          projectName: 'pepe-project1'
        },
        {
          projectId: new mongoose.Types.ObjectId(),
          projectName: 'pepe-project2'
        }
      ];


    });
  });

});
