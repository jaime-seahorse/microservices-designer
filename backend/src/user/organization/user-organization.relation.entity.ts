// import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
// import { UserEntity } from '../../users/entities/user.entity';;
// import { IsNumber } from 'class-validator';

// import { OrganizationEntity } from '../organization.entity';


// @Entity({ name: 'users_organizations_relation' })
// export class AuthUsersOrganizationsRelation {

//     @IsNumber({}, { message: 'Should be a valid id' })
//     @PrimaryGeneratedColumn()
//     id: number;



//     @ManyToOne(() => UserEntity, (auth) => auth.authUsersOrganizationsRelations, { nullable: true, onDelete: 'CASCADE' })
//     authUser: UserEntity

//     @ManyToOne(() => OrganizationEntity, (organization) => organization.authUsersOrganizationsRelations, { nullable: true, onDelete: 'CASCADE' })
//     organization: OrganizationEntity

// }

