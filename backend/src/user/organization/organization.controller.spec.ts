// import { Test, TestingModule } from '@nestjs/testing';
// import { OrganizationController } from './controllers/organization.controller';
// import { OrganizationService } from './organization.service';
// import { OrganizationEntity } from './organization.entity';
// import { GenericResponseOrganizationDto } from './genericResponseOrganizationResponse';

// describe('OrganizationController', () => {
//   let organizationController: OrganizationController;
//   let organizationService: OrganizationService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [OrganizationController],
//       providers: [OrganizationService],
//     }).compile();

//     organizationController = module.get<OrganizationController>(OrganizationController);
//     organizationService = module.get<OrganizationService>(OrganizationService);
//   });

//   describe('organizationFindById', () => {
//     it('should return the organization object', async () => {
//       const organizationObj: OrganizationEntity = {
//         id: 1,
//         name: 'Seahorses',
//         projects: null,
//         usersOrganizationsRelations: null,
//         createdAt: undefined
//       }

//       const reponse: GenericResponseOrganizationDto = { message: `Organization with id: 1 was found sucessfully`, organization: organizationObj }
//       jest.spyOn(organizationService, 'organizationFindById').mockResolvedValue(reponse);
//       expect(await organizationController.organizationFindById(1)).toEqual(reponse)
//     })
//   })

//   describe('createOrganization', () => {
//     it('should create a organization object', async () => {
//       const organizationObj2 = {
//         name: 'Seahorses',
//         projects: 'Proyect 1',
//         users: 'User 1'
//       }
//       const response = {
//         statusCode: 201,
//         message: "Organization created correctly"
//       }
//       jest.spyOn(organizationService, 'createOrganization').mockResolvedValue(organizationObj2)
//       expect(await organizationController.createOrganization(organizationObj2)).toEqual(response)
//     })
//   })

//   describe('deleteOrganization', () => {
//     it('should delete a organization', async () => {
//       const response =  { message: `Deleted Organization with id: 1` }

//       return { message: `Deleted Organization with id: ` }
//       jest.spyOn(organizationService, 'deleteOrganization').mockResolvedValue(response)
//       expect(await organizationController.deleteOrganization(1)).toEqual(response)
//     })
//   })

//   describe('updateOrganization', () => {
//     it('should update a organization', async () => {
//       const updateOrganization: updateOrganizationDto = {
//         name: "project3",
//         projects: "new proyect 2",
//         users: "proyectos 3"
//       }



//       const response = { message: `Organization with ${id} was sucesfully updated`, organization: updatedOrganization }
//       jest.spyOn(OrganizationService, 'updateOrganization').mockResolvedValue(response)
//       expect(await organizationController.updateOrganization(1, updateOrganization)).toEqual(response)
//     })
//   })

//   it('should be defined', () => {
//     expect(organizationController).toBeDefined();
//   });
// });
