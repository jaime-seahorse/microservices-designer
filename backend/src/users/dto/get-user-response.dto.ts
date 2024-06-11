import { AuthUsersProjectsRelation } from "src/projects/entities/user-project.relation";
import { UserApplicationRolesResponses } from "./user-roles-application-response.dto";
import { AuthUsersOrganizationsRelation } from "src/organization/entities/user-organization.relation.entity";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserResponseDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;   
}