import { PartialType } from "@nestjs/swagger";
import { CreateIntroDto } from "./create-intro.dto";
import { Types } from "mongoose";


export class IntroResponse extends PartialType(CreateIntroDto) {}