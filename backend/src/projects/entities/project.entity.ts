import { IsNumber, IsString, IsDate, IsArray } from "class-validator";
import { BoundedContextEntity } from "../../bounded-contexts/entities/bounded-context.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { OrganizationEntity } from "../../organization/entities/organization.entity";
import { AuthUsersProjectsRelation } from "./user-project.relation";

@Entity()
export class ProjectEntity {
    @IsNumber({}, { message: 'Should be a valid id' })
    @PrimaryGeneratedColumn()
    id: number;

    @IsString({ message: 'Should be a valid name' })
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @IsArray()
    @OneToMany(() => BoundedContextEntity, (boundedContext) => boundedContext.project,
        { nullable: true, onDelete: 'CASCADE' })
    boundedContexts: BoundedContextEntity[];

    @ManyToOne(() => OrganizationEntity, (organization) => organization.projects,
        { nullable: true, onDelete: 'CASCADE' })
    organization: OrganizationEntity;

    @OneToMany(() => AuthUsersProjectsRelation, (usersProjects) => usersProjects.project,
        { onDelete: 'CASCADE' })
    authUsersProjectsRelation: AuthUsersProjectsRelation[]

    @IsDate({ message: 'Should be a valid date' })
    @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;
}
