// import { UserEntity } from '../../users/entities/user.entity';
// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
// import { BoundedContextEntity } from './bounded-context.entity';


// @Entity()
// export class UserBoundedContextRelation {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(() => UserEntity, (user) => user.usersBoundedContext)
//     user: UserEntity;

//     @ManyToOne(() => BoundedContextEntity, (boundedContext) => boundedContext.userBoundedContextRelation)
//     boundedContext: BoundedContextEntity;


// }