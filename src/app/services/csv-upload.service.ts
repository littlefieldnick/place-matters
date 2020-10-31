import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {AppConfigService} from "./app-config.service";
import {catchError, map} from "rxjs/operators";
import {ErrorHandlerService} from "./error-handler.service";
import {AuthService} from "./auth.service";
import {Observable, Subject, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CsvUploadService {
    apiURL: string = this.appConfigService.externalApi || '/';

    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
                private authService: AuthService, private appConfigService: AppConfigService) {

    }

    upload(files){
        let status: { [key: string]: { progress: Observable<number> } } = {};
        for(let i = 0; i < files.length; i++){
            let file = files[i];
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            const progress = new Subject<number>();
            let options = this.authService.getOptions();
            options["reportProgress"] = true;

            this.http.post(this.apiURL + "api/resources/upload", formData, options)
                .subscribe((event: HttpEvent<any>) => {
                    if(event.type === HttpEventType.UploadProgress){
                        let percentDone = Math.round((100*event.loaded)/event.total);
                        progress.next(percentDone);
                    } else if(event instanceof HttpResponse) {
                        progress.complete();
                    }
                })

            status[file.name] = {
                progress: progress.asObservable()
            };
        }

        return status;
    }
}
