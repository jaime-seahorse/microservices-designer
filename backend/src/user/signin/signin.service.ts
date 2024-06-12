import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { CreateOrganizationService } from '../organization/create-organization/create-organization.service';
import { CreateOrganizationResponse } from '../organization/create-organization/create-organization-response.dto';
import { CreateOrganizationRequest } from '../organization/create-organization/create-organization-request.dto';

@Injectable()
export class SignInService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private organizationService: CreateOrganizationService
  ) { }


  async signIn(signInRequest: SignInRequest): Promise<SignInResponse> {
    try {

      const createUserEntity: UserEntity = this.createUser(signInRequest);
      const userEntityCreated: UserEntity = await this.userRepository.save(createUserEntity);

      const createOrganizationDto: CreateOrganizationRequest = new CreateOrganizationRequest();
      createOrganizationDto.name = signInRequest.organizationName;
      createOrganizationDto.userId = userEntityCreated.id;
      const organizationCreated: CreateOrganizationResponse = await this.organizationService.createOrganization(createOrganizationDto);

      return this.prepareSignInResponse(userEntityCreated, organizationCreated.name);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private createUser(signInRequest: SignInRequest): UserEntity {
    const createUserEntity: UserEntity = new UserEntity();
    createUserEntity.email = signInRequest.email;
    createUserEntity.name = signInRequest.name;
    createUserEntity.password = signInRequest.password;
    return createUserEntity;
  }

  private prepareSignInResponse(userEntityCreated: UserEntity, organization: string): SignInResponse {
    const signInResponse: SignInResponse = new SignInResponse();
    signInResponse.email = userEntityCreated.email;
    signInResponse.name = userEntityCreated.name;
    signInResponse.id = userEntityCreated.id;
    signInResponse.organizationName = organization;
    return signInResponse;

  }

}
