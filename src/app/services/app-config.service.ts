import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    public dashLayout: Object;

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
                this.iconRegistry.addSvgIcon(iconName,
                    this.domSanitizer.bypassSecurityTrustResourceUrl(this.assetsDirectory + "/icons/" + iconFiles[icon]));
            }

            return iconFiles;
        });
    }

    initializeDashboardLayouts(){
        return this.http.get("assets/dash.layout.schema.json").toPromise().then((layout) => {
            this.dashLayout = layout;
            return layout;
        });
    }
}
