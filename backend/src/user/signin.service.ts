import { Injectable, InternalServerErrorException} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { Organization } from './organization/organization.entity';
import { User } from './user.entity';


@Injectable()
export class SignInService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>

  ) { }

  async signIn(signInRequest: SignInRequest): Promise<SignInResponse> {

    try {

      const organization: Organization = new Organization();
      organization.name = signInRequest.organizationName;

      const organizationCreated: Organization = await this.createOrganization(organization);

      const user: User = this.setUserEntity(signInRequest, organizationCreated.id);

      if (await this.userRepository.findOneBy({ email: signInRequest.email })) {
        console.log('Email already exists')
        throw new Error('This email already exists')
      }

      const UserCreated: User = await this.userRepository.save(user);

      return this.setUserResponse(UserCreated, organizationCreated.name);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async createOrganization(organization: Organization): Promise<Organization> {
    try {

      if (await this.organizationRepository.findOneBy({ name: organization.name })) {
        throw new Error('This organization already exists')
      }

      const organizationCreated: Organization = await this.organizationRepository.save(organization);
      return organizationCreated;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private setUserEntity(signInRequest: SignInRequest, organizationId: number): User {
    const user: User = new User();
    user.email = signInRequest.email;
    user.name = signInRequest.name;
    user.password = signInRequest.password;
    user.organizationId = organizationId;
    return user;
  }

  private setUserResponse(userCreated: User, organization: string): SignInResponse {
    const signInResponse: SignInResponse = new SignInResponse();
    signInResponse.email = userCreated.email;
    signInResponse.name = userCreated.name;
    signInResponse.id = userCreated.id;
    signInResponse.organizationName = organization;
    return signInResponse;
  }

}
