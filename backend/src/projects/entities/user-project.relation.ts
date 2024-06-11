import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from '../../users/entities/user.entity';
import { ProjectEntity } from './project.entity';
import { IsNumber } from 'class-validator';




@Entity({ name: 'users_projects_relation' })
export class AuthUsersProjectsRelation {

    @IsNumber({}, { message: 'Should be a valid id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.authUsersProjectsRelation, { nullable: true, onDelete: 'CASCADE' })
    authUser: UserEntity

    @ManyToOne(() => ProjectEntity, (project) => project.authUsersProjectsRelation, { nullable: true, onDelete: 'CASCADE' })
    project: ProjectEntity

}

