import { PartialType } from "@nestjs/swagger";
import { CreateAboutDto } from "./create-about.dto";
import { Types } from "mongoose";


export class AboutResponse extends PartialType(CreateAboutDto)  {
    _id: Types.ObjectId
}