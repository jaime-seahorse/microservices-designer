import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { ProjectsModule } from './projects/projects.module';
import { BoundedContextsModule } from './bounded-contexts/bounded-contexts.module';
import { ProjectEntity } from './projects/entities/project.entity';
import { BoundedContextEntity } from './bounded-contexts/entities/bounded-context.entity';
import { OrganizationEntity } from './organization/entities/organization.entity';
import { AuthUsersProjectsRelation } from './projects/entities/user-project.relation';
import { AuthUsersOrganizationsRelation } from './organization/entities/user-organization.relation.entity';
import { OrganizationModule } from './organization/organization.module';
import { UserBoundedContextRelation } from './bounded-contexts/entities/user-bounded-context-relation.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProjectsModule,
    BoundedContextsModule,
    OrganizationModule,
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
    TypeOrmModule.forFeature([UserEntity]),
    ProjectsModule,
    BoundedContextsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
