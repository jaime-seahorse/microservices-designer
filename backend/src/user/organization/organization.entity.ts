import { IsNumber, IsString, IsArray } from 'class-validator';

import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class OrganizationEntity {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsArray()
    userIds : number[]
}
