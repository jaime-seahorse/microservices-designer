import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './organization.entity';
import { CreateOrganizationService } from './create-organization/create-organization.service';

@Module({
  controllers: [],
  providers: [CreateOrganizationService],
  imports: [TypeOrmModule.forFeature([OrganizationEntity])]
})
export class OrganizationModule { }
