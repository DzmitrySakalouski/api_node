import { UserModel, User } from "../../models/user-models.model";
import { IUserRepo } from "./user-repo-interface";
import { injectable, inject } from "inversify";
import { LoggerService } from "../../service";
import { LogStatus } from "../../constant";
import { sequelize } from "../../instances";
//import { reject } from "bluebird";

@injectable()
export class UserRepository implements IUserRepo {
    
    public constructor(@inject(LoggerService) private loggerService: LoggerService) { 
        this.loggerService.log(`User Repository usage`, LogStatus.INFO);
    }

    public addUser(oParams: UserModel): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            User.create(oParams).then(
                (res) => {
                    this.loggerService.log(`Set all User success ${res}`, LogStatus.INFO);
                    
                    return resolve();
                }
            ).catch(
                (error) => {
                    this.loggerService.log(error.errmsg, LogStatus.ERROR);

                    return reject();
                }
            );
        });
    }

    public userLogInCheck(oParams: UserModel): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            User.findOne({
                where: {
                    name: oParams.name,
                    password: oParams.password
                }
            }).then(res => resolve(res)).catch(error => this.loggerService.log(error.errmsg + 'UserRepo', LogStatus.ERROR));
        });
    }

    public getUserWithName(name: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            User.sequelize.query('SELECT id , name FROM "User" WHERE name=' + "'" + name + "'", {type: sequelize.QueryTypes.SELECT})
            .then((res) => resolve(res[0]))
            .catch(error => reject(this.loggerService.log(error.errmsg + 'getUser withName', LogStatus.ERROR)));
        });
    }
}
