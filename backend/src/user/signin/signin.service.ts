import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private organizationService: CreateOrganizationService,

  ) { }

  async signIn(signInRequest: SignInRequest): Promise<SignInResponse> {
    try {
      const createOrganizationDto: CreateOrganizationRequest = new CreateOrganizationRequest();
      createOrganizationDto.name = signInRequest.organizationName;
      const organizationCreated: CreateOrganizationResponse = await this.organizationService.createOrganization(createOrganizationDto);
      // Do a transaction
      const createUser: User = this.createUser(signInRequest, organizationCreated.id);
      if (await this.userRepository.findOneBy({ email: signInRequest.email })) {
        console.log('Email already exists')
        throw new Error('This email already exists')
      }
      const UserCreated: User = await this.userRepository.save(createUser);
      return this.prepareSignInResponse(UserCreated, organizationCreated.name);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private createUser(signInRequest: SignInRequest, organizationId: number): User {
    const createUser: User = new User();
    createUser.email = signInRequest.email;
    createUser.name = signInRequest.name;
    createUser.password = signInRequest.password;
    createUser.organizationId = organizationId;
    return createUser;
  }

  private prepareSignInResponse(UserCreated: User, organization: string): SignInResponse {
    const signInResponse: SignInResponse = new SignInResponse();
    signInResponse.email = UserCreated.email;
    signInResponse.name = UserCreated.name;
    signInResponse.id = UserCreated.id;
    signInResponse.organizationName = organization;
    return signInResponse;

  }

}
