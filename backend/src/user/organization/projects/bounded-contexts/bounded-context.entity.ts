// import { IsNumber, IsString, } from "class-validator";
// import { ProjectEntity } from "../project.entity";
// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
// import { UserBoundedContextRelation } from "./user-bounded-context-relation.entity";


// @Entity()
// export class BoundedContextEntity {

//     @IsNumber({}, { message: 'Should be a valid id' })
//     @PrimaryGeneratedColumn()
//     id: number;

//     @IsString({ message: 'Should be a valid name' })
//     @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
//     name: string;

//     @ManyToOne(() => ProjectEntity, (project) => project.boundedContexts)
//     project: ProjectEntity;

//     @OneToMany(() => UserBoundedContextRelation, (userBoundedContextRelation) => userBoundedContextRelation.boundedContext)
//     userBoundedContextRelation: BoundedContextEntity[];
// }
