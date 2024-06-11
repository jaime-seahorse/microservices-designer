import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { CreateOrganizationDto } from '../dto/create-organization-request.dto';
import { UpdateOrganizationRequestDto } from '../dto/update-organization-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';

// @ApiTags('Organizations')
// @ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  // @Get(':id')
  // async getOrganizacion(@Param('id', ParseIntPipe) id: number) {
  //   return await this.organizationService.organizationFindById(id);
  // }

  // @Post()
  // async createOrganization(@Body() createOrganizationDto: CreateOrganizationDto, userEntity: UserEntity) {
  //   return await this.organizationService.createOrganization(createOrganizationDto, userEntity)
  // }

  // @Delete(':id')
  // async deleteOrganization(@Param('id', ParseIntPipe) id: number) {
  //   return await this.organizationService.deleteOrganization(id);
  // }

  // @Patch(':id')
  // async updateOrganization(@Param('id') id: number, @Body() updateOrganizationDto: UpdateOrganizationRequestDto) {
  //   return await this.organizationService.updateOrganization(id, updateOrganizationDto)
  // }
}
