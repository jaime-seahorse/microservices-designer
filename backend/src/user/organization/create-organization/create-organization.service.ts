import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../organization.entity';
import { CreateOrganizationRequest } from './create-organization-request.dto';
import { User } from '../../user.entity';
import { CreateOrganizationResponse } from './create-organization-response.dto';

@Injectable()
export class CreateOrganizationService {

    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,

    ) { }

    async createOrganization(createOrganizationRequest: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
        try {
            if (await this.organizationRepository.findOneBy({ name: createOrganizationRequest.name })) {
                throw new Error('This organization already exists')
            }
            const organizationCreated: Organization = await this.organizationRepository.save(createOrganizationRequest);
            const createOrganizationResponse: CreateOrganizationResponse = new CreateOrganizationResponse();
            createOrganizationResponse.name = organizationCreated.name;
            createOrganizationResponse.id = organizationCreated.id;
            return createOrganizationResponse;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


}
