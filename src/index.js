import * as dotenv from 'dotenv';
dotenv.config()
import { botFactory } from './services/bot';
import { merge, timer, of, Subject } from 'rxjs';
import { delayWhen } from 'rxjs/operators';
import { registerNotificationHandler } from './notification';

const bot = botFactory();

const nextDelay = new Subject();

merge(of(0), nextDelay.asObservable()).pipe(
    delayWhen(e => {
        return timer(e)
    })
).subscribe(registerNotificationHandler(nextDelay))
bot.launch();
