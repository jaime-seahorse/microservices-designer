// import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// import { User } from '../../users/entities/user.entity';
// import { ProjectEntity } from './project.entity';
// import { IsNumber } from 'class-validator';




// @Entity({ name: 'users_projects_relation' })
// export class AuthUsersProjectsRelation {

//     @IsNumber({}, { message: 'Should be a valid id' })
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(() => User, (user) => user.authUsersProjectsRelation, { nullable: true, onDelete: 'CASCADE' })
//     authUser: User

//     @ManyToOne(() => ProjectEntity, (project) => project.authUsersProjectsRelation, { nullable: true, onDelete: 'CASCADE' })
//     project: ProjectEntity

// }

