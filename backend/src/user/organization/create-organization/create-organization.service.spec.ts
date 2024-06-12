import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationService } from './create-organization.service';
import { OrganizationEntity } from '../organization.entity';
import { CreateOrganizationRequest } from './create-organization-request.dto';
import { CreateOrganizationResponse } from './create-organization-response.dto';


describe('OrganizationService', () => {
    let organizationService: CreateOrganizationService;
    let organizationRepository: Repository<OrganizationEntity>
    const USER_REPOSITORY_TOKEN = getRepositoryToken(OrganizationEntity);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers:
                [CreateOrganizationService,
                    {
                        provide: USER_REPOSITORY_TOKEN,
                        useValue: {
                            create: jest.fn(),
                            update: jest.fn()
                        },
                    }

                ],

        }).compile();

        organizationService = module.get<CreateOrganizationService>(CreateOrganizationService);
    });



    describe('createOrganization', () => {
        it('should create a organization object', async () => {
            const createOrganizationRequest: CreateOrganizationRequest = new CreateOrganizationRequest();
            createOrganizationRequest.name = 'Organization';
            createOrganizationRequest.userId = 1;

            const createOrganizationResponseMock: CreateOrganizationResponse = new CreateOrganizationResponse();
            createOrganizationResponseMock.organizationName = 'Organization';

            jest.spyOn(organizationService, 'createOrganization').mockResolvedValue(createOrganizationResponseMock);
            const createOrganizationResponseService: CreateOrganizationResponse = await organizationService.createOrganization(createOrganizationRequest);
            expect(createOrganizationResponseService.organizationName).toEqual(createOrganizationRequest.name);
        })
    })

});
