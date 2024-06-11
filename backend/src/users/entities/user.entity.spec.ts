import { plainToInstance } from "class-transformer"
import { UserRoles } from "../../auth/enums/Roles.user"
import { UserEntity } from "./user.entity"
import { validate, ValidationError } from "class-validator"

describe('AuthUserEntity', () => {
    it('should create a new instance without errors', async () => {
        const data = {
            id: 1,
            username: 'victor1234',
            email: 'victor@gmail.com',
            password: 'victor1234',
            role: UserRoles.Admin,
            isActive: false,
            
        }

        const userEntity = plainToInstance(UserEntity, data);
        const errors = await validate(userEntity);
        console.log(errors);
        expect(errors.length).toBe(0)
    })

    it('should return a error for a invalid format username', async () => {
        const data = {
            id: 1,
            username: 1234,
            email: 'victor@gmail.com',
            password: 'victor1234',
            role: UserRoles.Admin,
            isActive: false,
        };
        const userEntity = plainToInstance(UserEntity, data);
        const errors = await validate(userEntity);
        // console.log('Error username: ',errors[1].value);
        expect(stringified(errors)).toContain('Should be a valid username')
    })


    it('should return a errors for a invalid format values', async () => {
        const data = {
            id: '1',
            username: 1234,
            email: null,
            password: undefined,
            role: 1,
            isActive: 'false',
        };
        const errors = [
            'Should be a valid id',
            'Should be a valid username',
            'Should be a valid email',
            'Should be a valid password',
            'Should be a valid rol',
            'Should be a boolean'
        ]
        const userEntity = plainToInstance(UserEntity, data);
        const errorsEntity = await validate(userEntity);
        console.log(errorsEntity);

        errors.forEach((error, i) => {
            const constraintsValues = Object.values(errorsEntity[i].constraints);
            expect(constraintsValues).toContain(error)
        })
    })


})
export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors);
}
