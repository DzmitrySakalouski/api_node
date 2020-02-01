import { Container } from 'inversify';
import { LoggerService, LoggerServiceImplementation } from './logger';

import {
    IUserRepo,
    UserRepository,
} from '../repo';

export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<IUserRepo>(IUserRepo).to(UserRepository);
