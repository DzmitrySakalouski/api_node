import { User, UserModel } from "../../models/user-models.model";

export abstract class IUserRepo {
    public abstract addUser(user: UserModel): Promise<User[]>;
    public abstract userLogInCheck(param: UserModel): Promise<User>;
    public abstract getUserWithName(email: string): Promise<User>;
}
