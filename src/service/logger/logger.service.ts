import { LogStatus } from "../../constant";

export abstract class LoggerService {
    public abstract log(message: string, status: LogStatus): void;
}
