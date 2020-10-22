import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService{
    constructor() {}

    processServerError(err: HttpErrorResponse): string {
        let errMsg: string;
        if (err.error instanceof ErrorEvent) {
            errMsg = 'Error: ' + err.message;
        } else {
            errMsg = err.error.errors;
        }

        return errMsg;
    }

    getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.error.errors}`;
            }
            case 403: {
                return `Access Denied: ${error.error.errors}`;
            }
            case 401: {
                return `Unauthorized: ${error.error.errors}`;
            }
            case 500: {
                return `Internal Server Error: ${error.error.errors}`;
            }
            default: {
                return `Unknown Server Error: ${error.error.errors}`;
            }
        }
    }
}