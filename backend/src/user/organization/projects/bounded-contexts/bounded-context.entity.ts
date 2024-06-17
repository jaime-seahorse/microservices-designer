// import { IsNumber, IsString, } from "class-validator";
// import { Project } from "../project.entity";
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

//     @ManyToOne(() => Project, (project) => project.boundedContexts)
//     project: Project;

//     @OneToMany(() => UserBoundedContextRelation, (userBoundedContextRelation) => userBoundedContextRelation.boundedContext)
//     userBoundedContextRelation: BoundedContextEntity[];
// }
