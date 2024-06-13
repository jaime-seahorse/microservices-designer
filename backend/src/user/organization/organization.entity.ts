import { IsNumber, IsString, IsArray } from 'class-validator';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ unique: true })
    @IsString()
    name: string;

    // @Column()
    // @IsArray()
    // userIds : number[]
}
