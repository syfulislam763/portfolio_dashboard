import { PartialType } from "@nestjs/swagger";
import { CreateRefreshTokenDto } from "./create-refresh.dto";

export class UpdateRefreshTokenDto extends PartialType(CreateRefreshTokenDto) {}