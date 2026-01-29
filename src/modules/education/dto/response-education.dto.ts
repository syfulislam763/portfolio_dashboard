import { PartialType } from "@nestjs/swagger";
import { CreateEducationDto } from "./create-education.dto";


export class EducationResponse extends PartialType(CreateEducationDto) {
    _id: string
}