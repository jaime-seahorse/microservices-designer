import { IsEmail, IsString, Length,  } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AuthUsersProjectsRelation } from '../../projects/entities/user-project.relation';
import { AuthUsersOrganizationsRelation } from '../../organization/entities/user-organization.relation.entity';
import { UserBoundedContextRelation } from '../../bounded-contexts/entities/user-bounded-context-relation.entity';


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsString({ message: 'Should be a valid username' })
    @Length(3, 18)
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    username: string;

    @IsEmail({}, { message: 'Should be a valid email' })
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @IsString({ message: 'Should be a valid password' })
    @Length(6, 60)
    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;


    @Column({ type: 'boolean', default: false, })
    isActive: boolean;

    @OneToMany(() => AuthUsersProjectsRelation, usersProjects => usersProjects.authUser, { onDelete: 'CASCADE' })
    authUsersProjectsRelation: AuthUsersProjectsRelation[];

    @OneToMany(() => AuthUsersOrganizationsRelation, usersOrganizations => usersOrganizations.authUser, { onDelete: 'CASCADE' })
    authUsersOrganizationsRelations: AuthUsersOrganizationsRelation[];

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => UserBoundedContextRelation, userBoundedContextRelation => userBoundedContextRelation.user, { onDelete: 'CASCADE' })
    usersBoundedContext: UserBoundedContextRelation[];
}
