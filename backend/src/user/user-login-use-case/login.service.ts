import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LogInRequest } from './login.request';
import { LogInResponse } from './login.response';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.entity';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from '../organization/organization.entity';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        @InjectModel(Organization.name)
        private organizationModel: Model<OrganizationDocument>,
    ) { }

    async logIn(logInRequest: LogInRequest): Promise<LogInResponse> {
        try {
            const userFounded: UserDocument = await this.userModel.findOne({
                where: {
                    email: logInRequest.email,
                    password: logInRequest.password
                }
            });
            console.log(userFounded)
            if (!userFounded) {
                throw new UnauthorizedException('Email or password incorrect');
            }

            const organizationFounded: OrganizationDocument =
                await this.organizationModel.findById(userFounded.organizationId)
            if (!organizationFounded) {
                throw new NotFoundException('Organization not founded')
            }


            return this.setLogInResponse(userFounded, organizationFounded);
        } catch (error) {
            console.log(error)
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message)
        }
    }

    private setLogInResponse(user: UserDocument, organization: OrganizationDocument): LogInResponse {
        const logInResponse: LogInResponse = new LogInResponse();
        logInResponse.userId = user._id;
        logInResponse.name = user.name;
        logInResponse.email = user.email;
        logInResponse.organizationId = organization._id;
        logInResponse.organizationName = organization.name;
        return logInResponse;
    }

    private validateLogin(logInRequest: LogInRequest): void {
        const keys = Object.keys(logInRequest);
        
    }

}
