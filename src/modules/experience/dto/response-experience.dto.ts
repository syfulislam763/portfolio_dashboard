import { PartialType } from "@nestjs/swagger";
import { CreateExperienceDto } from "./create-experience.dto";



export class ExperienceResponse extends PartialType(CreateExperienceDto) {
    _id: any
}