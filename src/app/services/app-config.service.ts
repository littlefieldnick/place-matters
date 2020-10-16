import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    public production: boolean
    public externalApi: string;
    public apiRoutes: Object;
    public assetsDirectory: string;
    public maineCenterCoords: Object;

    constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private iconRegistry: MatIconRegistry){

    }

    initializeAppConfigurations(){
        return this.http.get("assets/app.config.json").toPromise().then((configs) => {
            Object.assign(this, configs);
            return configs;
        });
    }

    initializeIconRegistry() {
        return this.http.get("assets/icons.json").toPromise().then((iconsToRegister) => {
            let iconFiles = iconsToRegister["iconFiles"];

            for (let icon in iconFiles) {
                let iconName = iconFiles[icon].split("-")[0]
                console.log(iconName);
                this.iconRegistry.addSvgIcon(iconName,
                    this.domSanitizer.bypassSecurityTrustResourceUrl(this.assetsDirectory + "/icons/" + iconFiles[icon]));
            }

            return iconFiles;
        });
    }
}
