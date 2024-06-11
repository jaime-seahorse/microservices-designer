import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { Repository } from 'typeorm'
import { OrganizationService } from '../../organization/services/organization.service';
import { AuthUsersProjectsRelation } from '../entities/user-project.relation';
import { UsersService } from '../../users/services/users.service';
import { ProjectsFindedResponseDto } from '../dto/projects-finded-response.dto';
import { ProjectsFindedByOrganizationResponseDto } from '../dto/projects-organization-response.dto';
import { ProjectsFindedByIdResponseDto as ProjectFindedByIdResponseDto } from '../dto/projects-id-finded-response.dto';
import { CreateProjectResponseDto } from '../dto/create-project-response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    private organizationService: OrganizationService,
    @InjectRepository(AuthUsersProjectsRelation)
    private usersProjectsRelationRepository: Repository<AuthUsersProjectsRelation>,
    private userService: UsersService
  ) { }

  async createOneProject(createProjectRequestDto: CreateProjectRequestDto): Promise<CreateProjectResponseDto> {
    try {
      //const organizationFinded: OrganizationEntity = (await this.organizationService.organizationFindById(idOrganization)).organization;
      //const projectCreated: ProjectEntity = await this.projectRepository.save({ organization: organizationFinded, ...createProjectRequestDto, });
      //if (!projectCreated) throw new InternalServerErrorException({ message: 'The project could not be created' })
      //const userId = payload.user_id;
      //const userFinded: GetUserResponseDto = await this.userService.findOneUserById(userId);
      // Do a transaction
      //await this.usersProjectsRelationRepository.save({ user: userFinded, project: projectCreated });
     // const projectFinded = await this.projectRepository.findOne({ where: { id: projectCreated.id }, relations: ['organization',] });

      //console.log(userId)
      return new CreateProjectResponseDto();
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException({ message: error })
    }
  }

  async findAllProjects(): Promise<ProjectsFindedResponseDto | {}> {
    try {
      const allProjects: ProjectEntity[] = await this.projectRepository.find()
      if (allProjects.length === 0) {
        return {
          message: 'There are no projects'
        }
      }
      return {
        allProjects: allProjects,
        message: 'Projects successfully found',
      }
    } catch (error) {
      throw new InternalServerErrorException({ message: error })
    }
  }

  async findOneProjectById(idProject: number,): Promise<any> {
    try {
      const projectFindedById: ProjectEntity =
        await this.projectRepository.findOneBy({ id: idProject })
      if (!projectFindedById) throw new NotFoundException({ message: `Project with id ${idProject} was not found` })
      console.log(projectFindedById)
      return {
        projectFinded: projectFindedById,
        message: `Project with id: ${idProject} successfully found`,
      }
    } catch (error) {
      throw new InternalServerErrorException({ message: error })
    }
  }

  async updateOneProjectById(idProject: number, updateProjectRequestDto: UpdateProjectRequestDto): Promise<any> {
    try {
      const projectUpdated = await this.projectRepository.update({ id: idProject }, { ...updateProjectRequestDto })

      const projectUpdatedFinded = await this.projectRepository.findOneBy({ id: idProject })
      if (!projectUpdated || !projectUpdatedFinded) throw new ConflictException({ message: 'Project not updated' })

      return {
        projectUpdated: projectUpdatedFinded,
        message: 'Project successfully updated'
      }
    } catch (error) {
      throw new InternalServerErrorException({ message: error })
    }
  }

  async removeOneProjectById(idProject: number): Promise<any> {
    try {
      const projectFinded: ProjectEntity = await this.projectRepository.findOneBy({ id: idProject })
      console.log(projectFinded)
      if (!projectFinded) throw new NotFoundException({ message: 'Project not found' })

      await this.projectRepository.delete({ id: projectFinded.id })
      const projectRemovedFinded = await this.projectRepository.findOneBy({ id: projectFinded.id })
      console.log(projectRemovedFinded);

      return {
        projectRemoved: projectFinded,
        message: 'Project successfully removed'
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException({ message: error })
    }
  }


  async findAllProjectsByOrganization(organizationId: number): Promise<ProjectsFindedByOrganizationResponseDto | { message: string }> {
    //   const listOfProjects
    //   const projectsByOrganizationFinded = await this.projectRepository.find({
    //     where: { organization: organizationFinded },
    //   });
    //   if (projectsByOrganizationFinded.length === 0) return {
    //     message: `There are no projects in the organization with id ${idOrganization}`
    //   }
    //   if (!projectsByOrganizationFinded) throw new NotFoundException({ message: 'Project not found' });

    //   return {
    //     message: 'Projects by organization successfully finded',
    //     projects: projectsByOrganizationFinded,
    //   }
    // } catch (error) {
    //   throw new InternalServerErrorException({ message: error })
    // }
    return null
  }

  async findallProjectsByUserId(userId: number): Promise<ProjectFindedByIdResponseDto[]> {
    try {
      const projectsFound: ProjectEntity[] = await this.projectRepository.find({
        where: {
          authUsersProjectsRelation: {
            authUser: { id: userId }
          }
        }
      });
      if (projectsFound.length === 0) {
        throw new NotFoundException(`No project found for userId: ${userId}`)
      }
      if (!projectsFound) throw new NotFoundException(`No project found for userId: ${userId}`);

      //TODO

       return [new ProjectFindedByIdResponseDto()];


    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}