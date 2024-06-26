import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Project } from "../project.schema"
import { BoundedContextEntity } from "./bounded-context.entity";
import { ValidationError } from "@nestjs/common";

describe("BoundedContextEntity", () => {
    const project = new Project();

    it("should create a new bounded Context without errors", async () => {
        const data = {
            id: 1,
            name: "bounded context name",
            project: project
        }

        const boundedContextEntity: BoundedContextEntity = plainToInstance(BoundedContextEntity, data);
        const errors = await validate(boundedContextEntity);
        expect(errors.length).toBe(0)
    })

    it("should return a error for invalidad format name", async () => {
        const data = {
            id: 1,
            name: 1,
            project: project
        }

        const boundedContextEntity: BoundedContextEntity = plainToInstance(BoundedContextEntity, data);
        const errors = await validate(boundedContextEntity);
        expect(stringified(errors)).toContain("Should be a valid name");
    })

    it("should return a errors for all invalid fomat values", async () => {
        const data = {
            id: "2",
            name: 2,
            project: "project"
        }

        const errors = [
            "Should be a valid id",
            "Should be a valid name"
        ];
        const boundedContextEntity = plainToInstance(BoundedContextEntity, data);
        const errorsDto = await validate(boundedContextEntity);
        errors.forEach((error, i) => {
            const constraintsValues = Object.values(errorsDto[i].constraints);
            expect(constraintsValues).toContain(error);
        });
    });


    it("should return a error of a repeated id", async () => {
        const firstBoundedContext: BoundedContextEntity = {
            id: 1,
            name: "bounded 1",
            project: project
        }
        const secondedBoundedContext = {
            id: 1,
            name: "bounded 2",
            project: project
        };

        const firstBoundedContextEntity = plainToInstance(BoundedContextEntity, firstBoundedContext);
        const secondBoundedContextEntity = plainToInstance(BoundedContextEntity, secondedBoundedContext);
        let error: string;

        if (firstBoundedContextEntity.id === secondBoundedContextEntity.id) {
            error = "This Bounded_Context_Entity with this id already exists.";
        }
        expect(error).toEqual("This Bounded_Context_Entity with this id already exists.");
    });


});

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors);
}