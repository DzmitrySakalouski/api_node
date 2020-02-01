import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { IUserRepo } from '../repo';
import { LoggerService } from '../service';
import * as passport from 'passport';
import { LogStatus } from '../constant';

@controller('/api/user', passport.authenticate('jwt', {session: false}))
export class UserController {
    constructor(
        @inject(IUserRepo) private userRepo: IUserRepo,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    @httpGet('/')
    public getUserData(request: Request, response: Response): Promise<Response> {

        return new Promise<Response>((resolve, reject) => {
            resolve(this.userRepo.getUserWithName(request.user.name).then(data => response.json(data)).catch((err) => response.send(err)));
            reject(this.loggerService.log('Unhandled error', LogStatus.ERROR));
        });
    }
}
