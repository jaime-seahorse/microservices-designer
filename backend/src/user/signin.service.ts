import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { SignInRequest } from './signin-request.dto';
import { SignInResponse } from './signin-response.dto';
import { Organization, OrganizationDocument } from './organization/organization.entity';
import { User, UserDocument } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';


@Injectable()
export class SignInService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>
  ) { }

  async signIn(signInRequest: SignInRequest): Promise<SignInResponse> {

    try {

      const organization: Organization = new Organization();
      organization.name = signInRequest.organizationName;

      const organizationDocument: OrganizationDocument = await this.createOrganization(organization);

      const userDocument: UserDocument = this.setUserDocument(signInRequest, organizationDocument._id);

      if (await this.userModel.findOne({ email: signInRequest.email })) {
        console.log('Email already exists')
        throw new Error('This email already exists')
      }

      organizationDocument.userIds.push(userDocument._id);
      const userCreated = await userDocument.save();
      const organizationCreated = await organizationDocument.save();

      return this.setUserResponse(userCreated, organizationCreated.name);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async createOrganization(organization: Organization): Promise<OrganizationDocument> {
    try {

      if (await this.organizationModel.findOne({ name: organization.name })) {
        throw new Error('This organization already exists')
      }

      const organizationCreated = new this.organizationModel(organization);
      console.log(organizationCreated)

      return organizationCreated;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private setUserDocument(signInRequest: SignInRequest, organizationId: mongoose.Types.ObjectId): UserDocument {
    const user: User = new User();
    user.email = signInRequest.email;
    user.name = signInRequest.name;
    user.password = signInRequest.password;
    user.organizationId = organizationId;
    return new this.userModel(user);
  }

  private setUserResponse(userCreated: UserDocument, organization: string): SignInResponse {
    const signInResponse: SignInResponse = new SignInResponse();
    signInResponse.email = userCreated.email;
    signInResponse.name = userCreated.name;
    signInResponse.id = userCreated.id;
    signInResponse.organizationName = organization;
    return signInResponse;
  }

}
