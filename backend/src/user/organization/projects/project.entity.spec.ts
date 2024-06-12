// import { plainToInstance } from "class-transformer"
// import { ProjectEntity } from "./project.entity"
// import { validate } from "class-validator"
// import { ValidationError } from "@nestjs/common"


// describe('ProjectEntity', () => {
//     it('Should create a new instance without errors', async () => {
//         const data: ProjectEntity = {
//             id: 1,
//             name: "Tirma",
//             boundedContexts: [],
//             organization: undefined,
//             createdAt: new Date(),
//             usersProjectsRelation: []
//         }

//         const projectEntity = plainToInstance(ProjectEntity, data);
//         const errors = await validate(projectEntity)
//         console.log(errors);
//         expect(errors.length).toBe(0)
//     })
//     it('Should return a error for a invalid format name', async () => {
//         const data = {
//             id: 1,
//             name: 1234,
//             boundedContexts: [],
//             organization: undefined,
//             usersProjectsRelation: [],
//             createdAt: new Date()
//         }
//         const projectEntity = plainToInstance(ProjectEntity, data)
//         const errors = await validate(projectEntity)
//         expect(errors.length).toBe(1)
//         expect(stringified(errors)).toContain('Should be a valid name')
//     })

//     it('Should return a errors for a invalid format values', async () => {
//         const data = {
//             id: '1',
//             name: 1234,
//             boundedContexts: [],
//             organization: undefined,
//             usersProjectsRelation: [],
//             createdAt: 'Juan'
//         }
//         const errors = [
//             'Should be a valid id',
//             'Should be a valid name',
//             'Should be a valid date'
//         ]
//         const projectEntity = plainToInstance(ProjectEntity, data)
//         const errorsEntity = await validate(projectEntity)
//         console.log(errorsEntity);

//         errors.forEach((error, i) => {
//             const constraintsValues = Object.values(errorsEntity[i].constraints)
//             expect(constraintsValues).toContain(error)
//         })
        

//     })
// })
// export function stringified(errors: ValidationError[]): string {
//     return JSON.stringify(errors);
// }
