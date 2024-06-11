import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { OrganizationEntity } from '../../organization/entities/organization.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoundedContextEntity } from '../../bounded-contexts/entities/bounded-context.entity';
import { AuthUsersProjectsRelation } from '../entities/user-project.relation';
import { UserRoles } from '../../auth/enums/Roles.user';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { AuthUsersOrganizationsRelation } from '../../organization/entities/user-organization.relation.entity';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { UserBoundedContextRelation } from '../../bounded-contexts/entities/user-bounded-context-relation.entity';
import { OrganizationService } from '../../organization/services/organization.service';
import { AuthService } from '../../auth/services/auth.service';
import { UsersModule } from '../../users/users.module';
import { PasswordHash } from '../../auth/utils/password.hash';
import { JWT } from '../../auth/utils/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants/JWT';
import { CreateProjectResponseDto } from '../dto/create-project-response.dto';

describe('ProjectsService', () => {
  let projectService: ProjectsService;
  let projectRepository: Repository<ProjectEntity>
  let organizationRepository: Repository<OrganizationEntity>
  let userRepository: Repository<UserEntity>
  let usersProjectsRepository: Repository<AuthUsersProjectsRelation>
  let usersOrganizationsRepository: Repository<AuthUsersOrganizationsRelation>

  const organizationEntity: OrganizationEntity = {
    id: 1,
    name: 'Organization',
    projects: [],
    authUsersOrganizationsRelations: [],
    createdAt: new Date()
  }


  const projects: ProjectEntity[] = [
    {
      id: 1,
      name: 'Tirma',
      boundedContexts: [],
      organization: organizationEntity,
      authUsersProjectsRelation: [],
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Santander',
      boundedContexts: [],
      organization: organizationEntity,
      authUsersProjectsRelation: [],
      createdAt: new Date()
    },
    {
      id: 3,
      name: 'Zara',
      boundedContexts: [],
      organization: organizationEntity,
      authUsersProjectsRelation: [],
      createdAt: new Date()
    },
  ]

  const AuthUserEntity: UserEntity = {
    id: 1,
    username: 'Pedro',
    email: 'pedro@gmail.com',
    password: 'pedro1234',
    role: UserRoles.Admin,
    isActive: false,
    authUsersOrganizationsRelations: [],
    createdAt: new Date(),
    authUsersProjectsRelation: [],
    usersBoundedContext: []
  }

  const userProjectRelation: AuthUsersProjectsRelation = {
    id: 1,
    role: UserRoles.Admin,
    authUser: AuthUserEntity,
    project: projects[0]
  }
  const usersOrganizationRelation: AuthUsersOrganizationsRelation = {
    id: 1,
    role: UserRoles.Writter,
    authUser: AuthUserEntity,
    organization: organizationEntity
  }

  AuthUserEntity.authUsersProjectsRelation.push(userProjectRelation)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, OrganizationService, AuthService, PasswordHash, JWT],
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "myuser",
          password: "1234",
          database: "seahorse",
          entities: [UserEntity, ProjectEntity, BoundedContextEntity, OrganizationEntity, AuthUsersProjectsRelation, AuthUsersOrganizationsRelation, UserBoundedContextRelation],
          synchronize: true
        }),
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '3600s' },
        }),
        TypeOrmModule.forFeature([UserEntity, OrganizationEntity, ProjectEntity, BoundedContextEntity, AuthUsersProjectsRelation, AuthUsersOrganizationsRelation]),
      ]
    }).compile();
    projectService = module.get<ProjectsService>(ProjectsService);
    projectRepository = module.get('ProjectEntityRepository')
    organizationRepository = module.get('OrganizationEntityRepository')
    userRepository = module.get('UserEntityRepository')
    usersProjectsRepository = module.get('AuthUsersProjectsRelationRepository')
    usersOrganizationsRepository = module.get('AuthUsersOrganizationsRelationRepository')
  });

  afterEach(async () => {
    await usersOrganizationsRepository.query('DELETE FROM users_organizations_relation')
    await usersProjectsRepository.query('DELETE FROM users_projects_relation')
    await userRepository.query('DELETE FROM user_entity')
    await projectRepository.query('DELETE FROM project_entity')
    await organizationRepository.query('DELETE FROM organization_entity')

    await organizationRepository.save(organizationEntity)
    await userRepository.save(AuthUserEntity)
    await Promise.all(projects.map(project => projectRepository.save(project)))
    await usersProjectsRepository.save(userProjectRelation)
    await usersOrganizationsRepository.save(usersOrganizationRelation)
  })

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('createOneProject', () => {
    it('Should create a project, link it to the organization and stored in database', async () => {
      const createProjectDto: CreateProjectRequestDto = {
        name: 'Hiper Dino'
      }
      let idOrganization = organizationEntity.id

      const payload = {
        userId: 1
      }
      const projectSaved = (await projectService.createOneProject(createProjectDto, payload, idOrganization)).projectCreated
      const projectFinded = await projectRepository.findOne({ where: { id: projectSaved.id }, relations: ['organization',] });
      console.log(projectSaved)
      console.log(projectFinded);
      expect(projectFinded).toEqual(projectSaved)
      expect(projectFinded.name).toEqual(createProjectDto.name)
    })
  })

  // describe('createManyProjects', () => {
  //   it('Should return all projects', async () => {
  //     const createManyProjectsDto: CreateManyProjectsDto = {
  //       idOrganization: organizationEntity.id,
  //       name: ['Bizum, Catalog']
  //     }
  //     const projectsSaved = await projectService.createManyProjects(createManyProjectsDto)
  //     const allProjects = await projectRepository.find()
  //     const projectsToCreate = projectsSaved.projects.name.
  //       filter((projectName: string) => allProjects.find(project => project.name === projectName));
  //     console.log(projectsToCreate);
  //     expect(projectsToCreate).toEqual(projectsSaved)
  //   })
  // })

  describe('findOneProject', () => {
    it('should find a project by id and return it', async () => {
      const idProject: number = projects[0].id;
      const projectFinded = (await projectService.findOneProjectById(idProject)).projectFinded;
      expect(projectFinded).toEqual(await projectRepository.findOneBy({ id: idProject }))
    })
  })

  describe('findAllProjects', () => {
    it('You should return all projects', async () => {
      const allProjectsResponse = (await projectService.findAllProjects()).allProjects;
      const allProjectsFinded = await projectRepository.find();
      expect(allProjectsResponse).toEqual(allProjectsFinded);
    })
  })

  describe('findAllProjectsByOrganization', () => {
    it('Should return a list of a projects by organization', async () => {
      const organizationFinded = await organizationRepository.findOneBy({ id: organizationEntity.id })
      const allProjectsByOrganization = await projectRepository.find({
        where: {
          organization: organizationFinded
        }
      });
      const allProjectsByOrganizationResponse = await projectService.findAllProjectsByOrganization(organizationEntity.id)
      console.log(allProjectsByOrganization)
      expect(allProjectsByOrganization).toEqual(allProjectsByOrganizationResponse)
    })
  })

  describe('removeOneProjectById', () => {
    it('Should remove one project by id and return it', async () => {
      const projectToRemoveId: number = projects[0].id;
      const projectToRemoveFinded = await projectRepository.findOneBy({ id: projectToRemoveId });
      const projectRemoved = await projectService.removeOneProjectById(projectToRemoveFinded.id);
      console.log(projectRemoved)
      expect(projectRemoved.projectRemoved).toEqual(projectToRemoveFinded)
      const allProjects = await projectRepository.find()
      expect(projectRemoved.projectRemoved).not.toContain(allProjects)
    })
  })

  describe('updateOneProjectById', () => {
    it('Should update one project by id and return it', async () => {
      const projectToUpdateId: number = projects[0].id
      const updateProjectDto: UpdateProjectRequestDto = {
        name: 'Santander'
      }
      const projectToUpdateFinded = await projectRepository.findOneBy({ id: projectToUpdateId })
      const projectUpdated = await projectService.updateOneProjectById(projectToUpdateFinded.id, updateProjectDto)
      expect(projectToUpdateFinded).not.toEqual(projectUpdated.projectUpdated.id)
      const projectUpdatedFinded = await projectRepository.findOneBy({ id: projectUpdated.projectUpdated.id })
      expect(projectUpdated.projectUpdated).toEqual(projectUpdatedFinded)
    })
  })

});
