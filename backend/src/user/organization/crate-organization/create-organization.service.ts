// import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { OrganizationEntity } from './organization.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateOrganizationDto } from './crate-organization/createOrganizationRequest.dto';
// import { UpdateOrganizationRequestDto } from './update-organization-request.dto';
// import { GenericResponseOrganizationDto } from './genericResponseOrganizationResponse';
// import { DeleteResponseBoundedContextDto } from './projects/bounded-contexts/dto/delete-response-bounded-context.dto';
// // import { UsersOrganizationsRelation } from '../entities/user-organization.relation.entity';
// import { UserEntity } from '../../users/entities/user.entity';
// import { DeleteResponseOrganizationDto } from './deleteReponseOrganizationRequest.dto';
// import { ProjectEntity } from '../../projects/entities/project.entity';
// import { DeleteOrganizationResponseDto } from './delete-organization-response.dto';
// import { AuthUsersOrganizationsRelation } from './entities/user-organization.relation.entity';

// @Injectable()
// export class OrganizationService {

//     constructor(
//         @InjectRepository(OrganizationEntity)
//         private organizationRepository: Repository<OrganizationEntity>,
//         @InjectRepository(AuthUsersOrganizationsRelation)
//         private userOrganizationRelationRepository: Repository<AuthUsersOrganizationsRelation>
//     ) { }

//     async organizationFindById(id: number): Promise<GenericResponseOrganizationDto> {
//         try {
//             const organization: OrganizationEntity = await this.organizationRepository.findOne({
//                 where: { id: id },
//                 relations: { projects: true, authUsersOrganizationsRelations: true }
//             })
//             if (!organization) { throw new NotFoundException(`Organization with id: ${id} was not found`) }
//             return { message: `Organization with id: ${id} was found sucessfully`, organization: organization }
//         } catch (exception) {
//             throw new InternalServerErrorException(exception)
//         }
//     }
//     async createOrganization(createOrganizationDto: CreateOrganizationDto, authUserEntity: UserEntity): Promise<any> {
//         try {
//             const organizationCreated = await this.organizationRepository.save(createOrganizationDto);
//             if (!organizationCreated) throw new InternalServerErrorException({ message: 'Organization not created.' })
//             const userOrgananizationRelationCreated: AuthUsersOrganizationsRelation = await this.userOrganizationRelationRepository.save({ authUser: authUserEntity, organization: organizationCreated })
//             console.log(userOrgananizationRelationCreated)
//             return {
//                 message: 'Organization successfully created',
//                 organizationCreated: organizationCreated
//             };
//         } catch (error) {
//             throw new InternalServerErrorException(error);
//         }
//     }


//     async deleteOrganization(id: number): Promise<DeleteOrganizationResponseDto> {
//         try {
//             const organization = await this.organizationRepository.findOneBy({ id: id })
//             if (!organization) { throw new NotFoundException(`Organization with id: ${id} was not found`) }
//             await this.organizationRepository.delete({ id: id })
//             return { message: `Deleted Organization with id: ${id}` }
//         } catch (error) {
//             throw new InternalServerErrorException('The organization could not be deleted')
//         }
//     }

//     async updateOrganization(id: number, updateOrganizationDto: UpdateOrganizationRequestDto): Promise<GenericResponseOrganizationDto> {
//         try {
//             const organization: OrganizationEntity = await this.organizationRepository.findOneBy({ id: id });
//             if (!organization) { throw new NotFoundException(`Organization with id: ${id} was not found`) }
//             await this.organizationRepository.update({ id: id }, { name: updateOrganizationDto.name })
//             const updatedOrganization = await this.organizationRepository.findOne({ where: { id: id }, relations: { projects: true } })
//             return { message: `Organization with ${id} was sucesfully updated`, organization: updatedOrganization }
//         } catch (error) {
//             throw new InternalServerErrorException(error)
//         }
//     }
// }
