import { PartialType } from "@nestjs/swagger";
import { CreateContactInfoDto } from "./create-contact-info.dto";
import { Types } from "mongoose";



export class ContactInfoResponse extends PartialType(CreateContactInfoDto) {
    _id: Types.ObjectId
}