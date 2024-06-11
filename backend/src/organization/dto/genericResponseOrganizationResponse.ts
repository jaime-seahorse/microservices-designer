import { OrganizationEntity } from "../entities/organization.entity";

export type GenericResponseOrganizationDto = {
    message: string;
    organization: OrganizationEntity
}