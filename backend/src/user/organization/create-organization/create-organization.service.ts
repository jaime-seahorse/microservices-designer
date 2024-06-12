import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from '../organization.entity';
import { CreateOrganizationRequest } from './create-organization-request.dto';
import { UserEntity } from '../../user.entity';
import { CreateOrganizationResponse } from './create-organization-response.dto';

@Injectable()
export class CreateOrganizationService {

    constructor(
        @InjectRepository(OrganizationEntity)
        private organizationRepository: Repository<OrganizationEntity>,

    ) { }


    async createOrganization(createOrganizationDto: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
        try {
            const organizationCreated: OrganizationEntity = await this.organizationRepository.save(createOrganizationDto);
            
            const createOrganizationResponse: CreateOrganizationResponse = new CreateOrganizationResponse();
            createOrganizationResponse.organizationName = organizationCreated.name

            return createOrganizationResponse;
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


}
