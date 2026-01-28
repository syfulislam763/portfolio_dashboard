import { PartialType } from "@nestjs/swagger";
import { CreateIntroDto } from "./create-intro.dto";


export class UpdateIntroDto extends PartialType(CreateIntroDto) {}