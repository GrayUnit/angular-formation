import { HttpClient } from "@angular/common/http"
import { TranslateHttpLoader } from "@ngx-translate/http-loader"

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json')
}


// En cas de fichiers Json trop lourd
// Il est possible de créer plusieurs loaders pour alléger
// le chargement
// export function HttpLoaderFactory(http: HttpClient) {
//     return new MultiTranslateHttpLoader(http, [
//         {prefix: "./assets/translate/core/", suffix: ".json"},
//         {prefix: "./assets/translate/shared/", suffix: ".json"},
//     ]);
// }