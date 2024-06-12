// import { Module } from '@nestjs/common';
// import { ProjectsService } from './services/projects.service';
// import { ProjectsController } from './projects.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProjectEntity } from './project.entity';
// import { OrganizationService } from 'src/organization/services/organization.service';
// import { OrganizationEntity } from 'src/organization/entities/organization.entity';
// import { UserEntity } from '../users/entities/user.entity';
// import { AuthUsersProjectsRelation } from './user-project.relation';
// import { AuthUsersOrganizationsRelation } from 'src/organization/entities/user-organization.relation.entity';
// import { UsersService } from '../users/services/users.service';
// import { BoundedContextsService } from 'src/bounded-contexts/services/bounded-context.service';
// import { BoundedContextEntity } from 'src/bounded-contexts/entities/bounded-context.entity';

// @Module({
//   controllers: [ProjectsController],
//   providers: [
//     ProjectsService,
//     OrganizationService,
//     AuthUsersProjectsRelation,
//     UsersService,
//     BoundedContextsService
//   ],
//   imports: [
//     TypeOrmModule.forFeature([
//       ProjectEntity,
//       OrganizationEntity,
//       AuthUsersProjectsRelation,
//       UserEntity,
//       AuthUsersOrganizationsRelation,
//       BoundedContextEntity
//     ]),
//   ],
// })
// export class ProjectsModule { }
