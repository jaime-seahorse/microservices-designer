// import { Test, TestingModule } from '@nestjs/testing';
// import { OrganizationService } from './organization.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrganizationEntity } from '../entities/organization.entity';
// import { Repository } from 'typeorm';
// import { ProjectEntity } from '../../projects/entities/project.entity';
// import { ProjectsService } from '../../projects/services/projects.service';
// import { UsersProjectsRelation } from '../../projects/entities/user-project.relation.entity';
// import { BoundedContextEntity } from '../../bounded-contexts/entities/bounded-context.entity';
// import { AuthUserEntity } from '../../users/entities/user.entity';
// import { UsersOrganizationsRelation } from '../entities/user-organization.relation.entity';
// import { UserBoundedContextRelation } from '../../bounded-contexts/entities/user-bounded-context-relation.entity';
// import { UpdateOrganizationDto } from '../dto/updateOrganization.dto';

// describe('OrganizationService', () => {
//   let organizationService: OrganizationService;
//   let organizationRepository: Repository<OrganizationEntity>

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [OrganizationService],
//       imports: [
//         TypeOrmModule.forRoot({
//           type: "mysql",
//           host: "localhost",
//           port: 3306,
//           username: "myuser",
//           password: "1234",
//           database: "seahorse",
//           entities: [AuthUserEntity, ProjectEntity, BoundedContextEntity, OrganizationEntity, UsersProjectsRelation,
//             UsersOrganizationsRelation, UserBoundedContextRelation, OrganizationEntity],
//           synchronize: true
//         }),
//         TypeOrmModule.forFeature([OrganizationEntity, ProjectEntity, UsersProjectsRelation])
//       ]
//     }).compile();

//     organizationService = module.get<OrganizationService>(OrganizationService);
//     organizationRepository = module.get('OrganizationEntityRepository')
//   });

//   // afterEach(async () => {
//   //   await organizationRepository.query('DELETE FROM organization_entity');
//   //   // await organizationRepository.save(users);
//   // });

//   describe('organizationFindById', () => {
//     it('should return the organization object', async () => {


//       const organizationObj: OrganizationEntity = {
//         id: 1,
//         name: 'Seahorses',
//         projects: null,
//         usersOrganizationsRelations: null,
//         createdAt: undefined
//       }
//       const createdOrganization: OrganizationEntity = await organizationRepository.save(organizationObj)
//       const organization: OrganizationEntity = await organizationRepository.findOne({
//         where: { id: createdOrganization.id },
//         relations: { projects: true, usersOrganizationsRelations: true }
//       })
//       expect(await organizationService.organizationFindById(1)).toEqual({
//         message: `Organization with id: ${organization.id} was found sucessfully`,
//         organization: organization
//       })
//     })
//   })

//   // describe('createOrganization', () => {
//   //   it('should create a organization object', async () => {
//   //     const organizationObj2: CreateOrganizationDto = {
//   //       name: 'Seahorses',
//   //       projects: 'Proyect 1',
//   //       users: 'User 1'
//   //     }
//   //     await organizationService.createOrganization(organizationObj2);
//   //     expect(await organizationService.organizationFindById(0)).toEqual(organizationObj2)     
//   //   })
//   // })

//   describe('deleteOrganization', () => {
//     it('should delete a organization by his id', async () => {
//       const organizationObj: OrganizationEntity = {
//         id: 1,
//         name: 'Seahorses',
//         projects: null,
//         usersOrganizationsRelations: null,
//         createdAt: undefined
//       }

//       await organizationRepository.save(organizationObj)
//       expect(await organizationService.deleteOrganization(1)).toEqual({ message: `Deleted Organization with id: ${organizationObj.id}` })
//     })
//   })

//   describe('updateOrganization', () => {
//     it('should update a organization', async () => {
//       const originalOrganizationObj: OrganizationEntity = {
//         id: 1,
//         name: 'Seahorses',
//         projects: null,
//         usersOrganizationsRelations: null,
//         createdAt: undefined
//       }

//       const updatedName: UpdateOrganizationDto = {
//         name: "new Project 2",
//       }

//       const savedOriginalOrganization: OrganizationEntity = await organizationRepository.save(originalOrganizationObj)
//       const updatedOrganization = await organizationService.updateOrganization(savedOriginalOrganization.id, updatedName)
//       expect(updatedOrganization).toEqual({
//         message: `Organization with ${savedOriginalOrganization.id} was sucesfully updated`,
//         ...updatedOrganization
//       })
//     })
//   })
//   it('should be defined', () => {
//     expect(OrganizationService).toBeDefined();
//   });
// });
