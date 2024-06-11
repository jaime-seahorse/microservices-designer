import { Module } from '@nestjs/common';
import { OrganizationService } from './services/organization.service';
import { OrganizationController } from './controllers/organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { AuthUsersOrganizationsRelation } from './entities/user-organization.relation.entity';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [TypeOrmModule.forFeature([OrganizationEntity, AuthUsersOrganizationsRelation])]
})
export class OrganizationModule { }
