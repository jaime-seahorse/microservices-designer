// import { Test, TestingModule } from '@nestjs/testing';
// import { ProjectsController } from '../projects.controller';
// import { ProjectsService } from '../services/projects.service';
// import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
// import { ProjectEntity } from '../entities/project.entity';
// import { OrganizationEntity } from '../../organization/entities/organization.entity';
// import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from '../../users/entities/user.entity';
// import { BoundedContextEntity } from '../../bounded-contexts/entities/bounded-context.entity';
// import { AuthUsersProjectsRelation } from '../entities/user-project.relation';
// import { AuthUsersOrganizationsRelation } from '../../organization/entities/user-organization.relation.entity';
// import { UserBoundedContextRelation } from '../../bounded-contexts/entities/user-bounded-context-relation.entity';
// import { CreateProjectResponseDto } from '../dto/create-project-response.dto';
// import { JwtPayload } from '../../auth/types/jwtPayload.type';
// import { UserRoles } from '../../auth/enums/Roles.user';
// import { OrganizationService } from '../../organization/services/organization.service';
// import { AuthService } from '../../auth/services/auth.service';
// import { PasswordHash } from '../../auth/utils/password.hash';
// import { JWT } from '../../auth/utils/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { TokenGuard } from '../../auth/guard/auth.guard';
// import { JwtService } from '@nestjs/jwt';

// // ? -- --findRelatedTests path

// describe('ProjectsController', () => {
//   let projectController: ProjectsController;
//   let projectService: ProjectsService;
//   const organization: OrganizationEntity = {
//     id: 1,
//     name: 'Tirma',
//     projects: [],
//     authUsersOrganizationsRelations: [],
//     createdAt: undefined
//   }
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProjectsController],
//       providers: [
//         ProjectsService,
//         OrganizationService,
//         ProjectEntity,
//         AuthService,
//         PasswordHash,
//         JWT,
//         JwtService,
//         {
//           provide: APP_GUARD,
//           useClass: TokenGuard
//         }
//       ],
//       imports: [

//         TypeOrmModule.forRoot({
//           type: "mysql",
//           host: "localhost",
//           port: 3306,
//           username: "myuser",
//           password: "1234",
//           database: "seahorse",
//           entities: [UserEntity, ProjectEntity, BoundedContextEntity, OrganizationEntity, AuthUsersProjectsRelation, AuthUsersOrganizationsRelation, UserBoundedContextRelation],
//           synchronize: true
//         }),
//         TypeOrmModule.forFeature([UserEntity, ProjectEntity, BoundedContextEntity, OrganizationEntity, AuthUsersProjectsRelation, AuthUsersOrganizationsRelation, UserBoundedContextRelation]),

//       ]
//     }).compile();

//     projectController = module.get<ProjectsController>(ProjectsController);
//     projectService = module.get<ProjectsService>(ProjectsService);
//   });

//   it('should be defined', () => {
//     expect(projectController).toBeDefined();
//   });

//   describe('createProject', () => {
//     it('Should create a project, link it to an organization and return it', async () => {

//       const createProjectRequestDto: CreateProjectRequestDto = {
//         name: 'Bizum'
//       }

//       const projectCreated: ProjectEntity = {
//         id: 1,
//         name: createProjectRequestDto.name,
//         boundedContexts: [],
//         organization: organization,
//         createdAt: undefined,
//         authUsersProjectsRelation: []
//       }

//       const createProjectResponseDto: CreateProjectResponseDto = {
//         projectCreated: projectCreated,
//         message: ''
//       }

//       const payload: JwtPayload = {
//         user_id: 0,
//         username: '',
//         user_role: '',
//         organization: {
//           id_organization: 0,
//           role_organization: UserRoles.Admin,
//           projects: []
//         }
//       }

//       jest.spyOn(projectService, 'createOneProject').mockResolvedValue(createProjectResponseDto)
//       const result = await projectController.createOneProject(organization.id, createProjectRequestDto, payload,)
//       console.log(result);
//       console.log(createProjectResponseDto)
//       expect(projectController.createOneProject && projectService.createOneProject).toBeDefined()
//       expect(result).toEqual(createProjectResponseDto)

//     })
//   })

//   describe('findOneProjectById', () => {
//     it('Should return a project by id', async () => {
//       const idProject = 1;

//       const projectFinded: ProjectEntity = {
//         id: idProject,
//         name: 'Bizum',
//         boundedContexts: [],
//         organization: organization,
//         createdAt: undefined,
//         authUsersProjectsRelation: []
//       }

//       jest.spyOn(projectService, 'findOneProjectById').mockResolvedValue(projectFinded)
//       const result = await projectController.findOneProjectById(idProject);
//       console.log(result)
//       expect(projectController.findOneProjectById).toBeDefined()

//       expect(result).toEqual(projectFinded);
//     })
//   })

//   describe('removeOneProjectById', () => {
//     it('Should remove one project by id and return it', async () => {
//       const idProject = 1;

//       const projectRemoved: ProjectEntity = {
//         id: idProject,
//         name: 'Bizum',
//         boundedContexts: [],
//         organization: organization,
//         createdAt: undefined,
//         authUsersProjectsRelation: []
//       }

//       jest.spyOn(projectService, 'removeOneProjectById').mockResolvedValue(projectRemoved)
//       const result = await projectController.removeOneProjectById(idProject, null)
//       console.log(result);
//       expect(projectController.removeOneProjectById).toBeDefined()
//       expect(result).toEqual(projectRemoved)
//     })
//   })

//   describe('updateOneProjectById', () => {
//     it('Should update one project by id and return it', async () => {
//       const idProject = 1

//       const projectToUpdate: ProjectEntity = {
//         id: idProject,
//         name: 'Bizum',
//         boundedContexts: [],
//         organization: organization,
//         createdAt: undefined,
//         authUsersProjectsRelation: []
//       }

//       const updateProjectRequestDto: UpdateProjectRequestDto = {
//         name: 'Tirma'
//       }

//       jest.spyOn(projectService, 'updateOneProjectById').mockResolvedValue(projectToUpdate)
//       const result = await projectController.updateOneProjectById(idProject, updateProjectRequestDto)
//       console.log(result);

//       expect(projectController.updateOneProjectById).toBeDefined()
//       expect(projectToUpdate.name).not.toEqual(result)

//       const projectUpdated: ProjectEntity = { ...result }
//       console.log('Project updated: ', projectUpdated);
//       expect(result).toEqual(projectUpdated)
//     })
//   })


// });
