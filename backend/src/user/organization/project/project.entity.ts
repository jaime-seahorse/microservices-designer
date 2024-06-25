import { IsNumber, IsString, IsDate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @IsNumber({}, { message: 'Should be a valid id' })
    @PrimaryGeneratedColumn()
    id: number;

    @IsString({ message: 'Should be a valid name' })
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @IsNumber()
    @Column()
    organizationId: number;

    @IsDate({ message: 'Should be a valid date' })
    @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;
}
