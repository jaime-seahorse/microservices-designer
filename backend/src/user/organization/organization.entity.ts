// import { IsNumber, IsString } from 'class-validator';
// import { AuthUsersOrganizationsRelation } from './entities/user-organization.relation.entity';
// import { ProjectEntity } from '../../projects/entities/project.entity';
// import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
// import { IsDate } from 'class-validator';

// @Entity()
// export class OrganizationEntity {

//     @PrimaryGeneratedColumn()
//     @IsNumber()
//     id: number;

//     @Column()
//     @IsString()
//     name: string;

//     @OneToMany(() => ProjectEntity, (project) => project.organization)
//     projects: ProjectEntity[];

//     @OneToMany(() => AuthUsersOrganizationsRelation, (authUserOrganization) => authUserOrganization.organization, { onDelete: 'CASCADE' })
//     authUsersOrganizationsRelations: AuthUsersOrganizationsRelation[]

//     @IsDate()
//     @Column({ default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date;
// }
