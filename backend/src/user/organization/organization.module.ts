import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationService } from './create-organization/create-organization.service';

@Module({
  controllers: [],
  providers: [CreateOrganizationService],
  imports: [TypeOrmModule.forFeature([Organization])]
})
export class OrganizationModule { }
