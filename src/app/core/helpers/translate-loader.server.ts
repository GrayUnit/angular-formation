import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";
import { TranslateLoader } from "@ngx-translate/core";
import { join } from "path";
import { Observable } from "rxjs";
import * as fs from 'fs';


export class TranslateServerLoader implements TranslateLoader {

    constructor(
        private transferState: TransferState,
        private prefix: string = "i18n",
        private suffix: string = ".json"
    ) {}


    getTranslation(lang: string): Observable<any> {
        return new Observable(
            (observer) => {
                const assets_folder = join(
                    process.cwd(),
                    'dist',
                    'crm-betclic',
                    'browser',
                    'assets',
                    this.prefix
                );

                const jsonData = JSON.parse(
                    fs.readFileSync(`${assets_folder}/${lang}${this.suffix}`, 'utf-8')
                );

                const key: StateKey<number> = makeStateKey<number>(
                    `transfer-translate-${lang}`
                );

                this.transferState.set(key, jsonData);
                observer.next(jsonData);
                observer.complete();
            }
        )
    }

    
}


export function translateServerLoaderFactory(transferState: TransferState) {
    return new TranslateServerLoader(transferState)
}