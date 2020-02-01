import { injectable } from "inversify";

import { LogStatus } from "../../constant";
import { LoggerService } from "./logger.service";

@injectable()
export class LoggerServiceImplementation implements LoggerService {
    public log(message: string, status: LogStatus): void {
        switch (status) {
            case LogStatus.INFO: {
                console.log('INFO: ' + message);
                break;
            }
            case LogStatus.ERROR: {
                console.log("ERROR: " + message);
                break;
            }
            default: {
                console.log("ERROR: " + message);
            }
        }
    }
}
