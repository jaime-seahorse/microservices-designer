import { Test, TestingModule } from '@nestjs/testing';
import { BoundedContextsService } from './bounded-context.service';
import { BoundedContextEntity } from '../entities/bounded-context.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { CreateBoundedContextDto } from '../dto/create-bounded-context-request.dto';
import { UpdateBoundedContextDto } from '../dto/update-bounded-context-request.dto';
import { AuthUserEntity } from '../../users/entities/user.entity';
import { OrganizationEntity } from '../../organization/entities/organization.entity';
import { UsersProjectsRelation } from '../../projects/entities/user-project.relation.entity';
import { UsersOrganizationsRelation } from '../../organization/entities/user-organization.relation.entity';
import { UserBoundedContextRelation } from '../entities/user-bounded-context-relation.entity';


describe('BoundedContextsService', () => {
  let boundedContextService: BoundedContextsService;
  let boundedContextsRepository: Repository<BoundedContextEntity>
  let projectRepository: Repository<ProjectEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoundedContextsService],
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "myuser",
          password: "1234",
          database: "seahorse",
          entities: [AuthUserEntity, ProjectEntity, BoundedContextEntity, OrganizationEntity, UsersProjectsRelation,
            UsersOrganizationsRelation, UserBoundedContextRelation],
          synchronize: true
        }),
        TypeOrmModule.forFeature([BoundedContextEntity, ProjectEntity])
      ]
    }).compile();
    boundedContextService = module.get<BoundedContextsService>(BoundedContextsService);
    boundedContextsRepository = module.get('BoundedContextEntityRepository')
    projectRepository = module.get('ProjectEntityRepository')
  });

  afterEach(async () => {
    await boundedContextsRepository.query('DELETE FROM bounded_context_entity');
    await projectRepository.query('DELETE FROM project_entity')
  });

  describe('findBoundedContextById', () => {
    it('should find a BoundedContext by Id', async () => {

      const project: ProjectEntity = {
        id: 0,
        name: '',
        boundedContexts: [],
        organization: null,
        usersProjectsRelation: null,
        createdAt: undefined
      }


      const createBoundedContextDto: CreateBoundedContextDto = {
        name: 'bounded context name 1',
        projectId: 0
      }

      //We save the project
      const projectSaved = await projectRepository.save(project);

      //We set the project id in the createBoundedContextDto
      createBoundedContextDto.projectId = projectSaved.id

      //We save the boundedContext in the database
      const boundedContextCreated: BoundedContextEntity = await boundedContextsRepository.save({ ...createBoundedContextDto, project: projectSaved, });

      expect((await boundedContextService.findBoundedContextById(boundedContextCreated.id))).toEqual(await boundedContextsRepository.findOne(
        { where: { id: boundedContextCreated.id }, relations: { project: true } }))
    })
  })

  describe('getBoundedContextsByProjectId', () => {
    it('should find 1 or more boundedContext by project id', async () => {
      const project: ProjectEntity = {
        id: 0,
        name: '',
        boundedContexts: [],
        organization: null,
        usersProjectsRelation: null,
        createdAt: undefined
      }

      const projectSaved = await projectRepository.save(project);

      const createBoundedContextDto1: CreateBoundedContextDto = {
        name: 'bounded context name 1',
        projectId: 0
      }

      const createBoundedContextDto2: CreateBoundedContextDto = {
        name: 'bounded context name 4',
        projectId: 0
      }

      const boundedContextCreated1: BoundedContextEntity = await boundedContextsRepository.save({ ...createBoundedContextDto1, project: projectSaved, });
      const boundedContextCreated2: BoundedContextEntity = await boundedContextsRepository.save({ ...createBoundedContextDto2, project: projectSaved, });

      expect(await boundedContextService.getBoundedContextsByProjectId(project.id)).toEqual(
        await boundedContextsRepository.find({ where: { project: { id: project.id } }, relations: { project: true } })
      )
    })
  })

  describe('createBoundedContext', () => {
    it('should create a bounded context', async () => {
      const createBoundedContextDto: CreateBoundedContextDto = {
        name: "bounded context title",
        projectId: 0
      }

      const newBoundedContext = await boundedContextService.createBoundedContext(createBoundedContextDto);
      console.log(newBoundedContext)
      expect(newBoundedContext).toEqual(await boundedContextsRepository.findOne(
        { where: { id: newBoundedContext.id }, relations: { project: true } }))
    })
  })

  describe('updateBoundedContext', () => {
    it('should update a bounded context', async () => {
      const project: ProjectEntity = {
        id: 0,
        name: '',
        boundedContexts: [],
        organization: null,
        usersProjectsRelation: null,
        createdAt: undefined
      }

      const oldBoundedContext: CreateBoundedContextDto = {
        name: "bounded context title",
        projectId: project.id
      }

      const savedProject = await projectRepository.save(project)
      const createdBoundedContext: BoundedContextEntity = await boundedContextsRepository.save({ ...oldBoundedContext, project: savedProject })

      const updatedBoundedContext: UpdateBoundedContextDto = {
        name: "updated bounded context",
        projectId: project.id
      }

      const newBoundedContext = await boundedContextService.updateBoundedContext(createdBoundedContext.id, updatedBoundedContext);
      expect(newBoundedContext).toEqual(
        await boundedContextsRepository.findOne((
          { where: { id: newBoundedContext.id }, relations: { project: true } }))
      )
    })
  })

  describe('deleteBoundedContext', () => {
    it('should delete a bounded context', async () => {
      const project: ProjectEntity = {
        id: 0,
        name: '',
        boundedContexts: [],
        organization: null,
        usersProjectsRelation: null,
        createdAt: undefined
      }

      const boundedContextDto: CreateBoundedContextDto = {
        name: "bounded context title",
        projectId: project.id
      }

      const savedProject = await projectRepository.save(project)
      console.log(savedProject)
      const boundedContextToDelete: BoundedContextEntity = await boundedContextsRepository.save({ ...boundedContextDto, project: savedProject })
      // expect(await boundedContextsRepository.findOneBy({ id: boundedContextToDelete.id })).toEqual({
      //   where: { id: boundedContextToDelete.id }, relations: { project: true }
      // })
      expect(await boundedContextService.deleteBoundedContext(boundedContextToDelete.id)).toEqual({
        message: `Bounded context with id: ${boundedContextToDelete.id} deleted correctly`
      })
      expect(await boundedContextsRepository.findOneBy({ id: boundedContextToDelete.id })).toBe(null)
    })
  })

  it('should be defined', () => {
    expect(boundedContextService).toBeDefined();
  });
});
