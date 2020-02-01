import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { IUserRepo } from '../repo';
import { LoggerService } from '../service';
import { UserModel } from '../models';
import { LogStatus } from '../constant';
import * as jwt from 'jsonwebtoken';

@controller('/api/login')
export class LoginController {
    constructor(
        @inject(IUserRepo) private userRepo: IUserRepo,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    @httpPost('/')
    public logIn(request: Request, response: Response): Promise<Response> {
        const oParams: UserModel = {
            name: request.body.name,
            password: request.body.password
        };

        return new Promise((resolve, reject) => {
            resolve(this.userRepo.userLogInCheck(oParams).then(() => response.json({token: jwt.sign(oParams.name, 'feed')})));
            reject(this.loggerService.log('Unhandled error', LogStatus.ERROR));
        });
    }
}
