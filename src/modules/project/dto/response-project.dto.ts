import { PartialType } from "@nestjs/swagger";
import { CreateProjectDto } from "./create-project.dto";



export class ProjectResponse extends PartialType(CreateProjectDto) {}