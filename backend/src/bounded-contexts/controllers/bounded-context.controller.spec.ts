import { Test, TestingModule } from '@nestjs/testing';
import { BoundedContextsController } from './bounded-context.controller';
import { BoundedContextsService } from '../services/bounded-context.service';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { CreateBoundedContextDto } from '../dto/create-bounded-context-request.dto';
import { BoundedContextEntity } from '../entities/bounded-context.entity';
import { UpdateBoundedContextDto } from '../dto/update-bounded-context-request.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../organization/entities/organization.entity';
import { AuthUserEntity } from '../../users/entities/user.entity';

describe('BoundedContextsController', () => {
  let boundedContextController: BoundedContextsController;
  let boundedContextService: BoundedContextsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoundedContextsController],
      providers: [BoundedContextsService],
      imports: [TypeOrmModule.forRoot({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "myuser",
        password: "1234",
        database: "seahorse",
        entities: [AuthUserEntity, ProjectEntity, BoundedContextEntity, OrganizationEntity],
        synchronize: true
      }),
        TypeOrmModule.forFeature([BoundedContextEntity]),]
    }).compile();

    boundedContextController = module.get<BoundedContextsController>(BoundedContextsController);
    boundedContextService = module.get<BoundedContextsService>(BoundedContextsService)
  });



  const project: ProjectEntity = new ProjectEntity()

  describe('getBoundedContext', () => {
    it('should return a Bounded Context', async () => {
      const boundedResponseObject: BoundedContextEntity = {
        id: 1,
        name: 'bounded context name',
        project: project
      }

      jest.spyOn(boundedContextService, 'findBoundedContextById').mockResolvedValue(boundedResponseObject)
      expect(await boundedContextController.findBoundedContextById(1)).toEqual(boundedResponseObject)
    })
  })

  describe('createBoundedContext', () => {
    it('should create a Bounded Context', async () => {
      const boundedData: CreateBoundedContextDto = {
        name: "bounded 1",
        project: project
      }

      const finalBoundedContext: BoundedContextEntity = {
        id: 1,
        name: "bounded 1",
        project: project
      }

      jest.spyOn(boundedContextService, 'createBoundedContext').mockResolvedValue(finalBoundedContext)
      expect(await boundedContextController.createBoundedContext(boundedData)).toEqual(finalBoundedContext)
    })
  })


  describe('updateBoundedContext', () => {
    it('should update a Bounded Context', async () => {
      const update: UpdateBoundedContextDto = {
        name: 'Name updated',
        projectId: 0
      }

      const updateResponse: BoundedContextEntity = {
        id: 1,
        name: "updated Bounded",
        project: project
      }

      jest.spyOn(boundedContextService, 'updateBoundedContext').mockResolvedValue(updateResponse)
      expect(await boundedContextController.updateBoundedContext(1, update)).toEqual(updateResponse)
    })
  })

  describe('deleteBoundedContext', () => {
    it('should delete a Bounded Context', async () => {

      const objectToDelete: BoundedContextEntity = {
        id: 1,
        name: 'bounded context name',
        project: project
      }

      jest.spyOn(boundedContextService, 'deleteBoundedContext').mockResolvedValue(objectToDelete)
      expect(await boundedContextController.deleteBoundedContext(1)).toEqual(objectToDelete)
    })
  })

  it('should be defined', () => {
    expect(boundedContextController).toBeDefined();
  });

});
