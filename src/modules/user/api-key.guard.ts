import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";


@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor (private userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if(!apiKey){
            throw new UnauthorizedException("API key is missing")
        }

        const user = await this.userService.validateApiKey(apiKey)

        request.user = user;

        return true;

    }
}