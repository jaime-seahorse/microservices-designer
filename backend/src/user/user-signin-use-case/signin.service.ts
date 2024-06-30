import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { Organization, OrganizationDocument } from '../organization/organization.entity';
import { User, UserDocument } from '../user.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';


@Injectable()
export class SignInService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>
  ) { }

  async signIn(signInRequest: SignInRequest): Promise<SignInResponse> {

    try {

      const organizationDocument: Organization = await this.createOrganization(signInRequest.organizationName);

      const userDocument = this.setUser(signInRequest);

      if (await this.userModel.findOne({ email: signInRequest.email })) {
        console.log('Email already exists')
        throw new ConflictException('This email already exists')
      }

      const userCreated = await this.userModel.create(userDocument);
      console.log('User created: ', userCreated)
      organizationDocument.userIds.push(userCreated._id);
      const organizationCreated = await this.organizationModel.create(organizationDocument);
      console.log('Organziation created: ', organizationCreated);
      const userUpdated: UserDocument = await this.userModel
        .findOneAndUpdate({ _id: userCreated._id }, { organizationId: organizationCreated.id }).exec()
      console.log('User updated: ', userUpdated);
      return this.setUserResponse(userUpdated, organizationCreated);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }


  async createOrganization(organizationName: string): Promise<Organization> {
    try {

      if (await this.organizationModel.findOne({ name: organizationName })) {
        throw new ConflictException('This organization already exists')
      }
      const organization: Organization = new Organization();
      organization.name = organizationName;
      organization.userIds = [];
      organization.projectIds = [];

      return organization;

    } catch (error) {
      if(error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  private setUser(signInRequest: SignInRequest): User {
    const user: User = new User();
    user.email = signInRequest.email;
    user.name = signInRequest.name;
    user.password = signInRequest.password;
    return user;
  }

  private setUserResponse(userCreated: UserDocument, organization: OrganizationDocument): SignInResponse {
    const signInResponse: SignInResponse = new SignInResponse();
    signInResponse.email = userCreated.email;
    signInResponse.name = userCreated.name;
    signInResponse.id = userCreated.id;
    signInResponse.organizationName = organization.name;
    signInResponse.organizationId = organization._id;
    return signInResponse;
  }

}
