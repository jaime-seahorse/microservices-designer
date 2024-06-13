import { IsEmail, IsNumber, IsString, Length, } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsString({ message: 'Should be a valid username' })
    @Length(3, 18)
    @Column({ type: 'varchar', length: 100,  nullable: false })
    name: string;

    @IsEmail({}, { message: 'Should be a valid email' })
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @IsString({ message: 'Should be a valid password' })
    @Length(6, 60)
    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @IsNumber({}, {message: 'Should be a valid id of organization'})
    @Column()
    organizationId: number;


}
