import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {County} from "../../../models/county";
import {ResourceService} from "../../../services/resource.service";
import {CsvUploadService} from "../../../services/csv-upload.service";
import {Papa} from "ngx-papaparse";
import {CsvHeader} from "../../../models/csv-record";
import {AppConfigService} from "../../../services/app-config.service";
import {MatDialog} from "@angular/material/dialog";
import {UploadDialogComponent} from "./upload-dialog/upload-dialog.component";
import {CategoryService} from "../../../services/category.service";
import {ResourceCategory} from "../../../models/resource_category";

@Component({
    selector: 'resource-csv-upload',
    templateUrl: './resource-csv-upload.component.html',
    styleUrls: ['./resource-csv-upload.component.scss']
})

export class ResourceCsvUploadComponent implements OnInit {
    @ViewChild('file', {static: false}) file;
    uploadedFile: File;
    countyFormStep: FormGroup;
    csvFormStep: FormGroup;
    countyListing: Array<County>;
    categories: Array<ResourceCategory>;
    dataSource: CsvHeader[];
    displayedColumns = ["csvColumn", "example", "dbColumn"];
    resourceDbColumnNames = this.appConfigService.resourceDbColumnMappingLabels;
    finalColumnMapping = {};
    fileSizeLimit = 5;

    constructor(private papa: Papa, private dialog: MatDialog, private formBuilder: FormBuilder,
                private appConfigService: AppConfigService,
                private categoryService: CategoryService,
                private resourceService: ResourceService,
                private uploader: CsvUploadService) {

    }

    ngOnInit(): void {
        this.resourceService.getCounties().subscribe((counties) => {
            this.countyListing = counties["data"];
        });

        this.categoryService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });

        this.countyFormStep = this.formBuilder.group({
            county: ['', Validators.required]
        });

        this.csvFormStep = this.formBuilder.group({
            csv: ['', Validators.required]
        })
    }

    getSelectedCounty(){
        if (this.countyFormStep.controls["county"].value)
            return this.countyListing[this.countyFormStep.controls["county"].value - 1].countyName;

        return '';
    }
    addFiles() {
        this.file.nativeElement.click();
    }

    getFileModifiedDate(d){
        return new Date(d);
    }
    onFilesAdded(event) {
        this.uploadedFile = (event.target as HTMLInputElement).files[0];
        this.csvFormStep.patchValue({'csv': this.uploadedFile});
        this.csvFormStep.get('csv').updateValueAndValidity();

        this.getCsvHeaders();
    }

    updateColumnMapping(column, event) {
        this.finalColumnMapping[column].mappedName = event.value;
        if(event.value == undefined)
            this.finalColumnMapping[column].valid = false;
        console.log(this.finalColumnMapping);
    }

    getCsvHeaders() {
        let options = {
            header: false,
            preview: 2,
            complete: (results, file) => {
                let data = []
                for (let row = 0; row < results.data[0].length; row++) {
                    data.push(new CsvHeader(results.data[0][row], results.data[1][row]));
                    let idx = this.resourceDbColumnNames.indexOf(results.data[0][row].toLowerCase().trim())
                    if (idx > -1) {
                        this.finalColumnMapping[results.data[0][row]] = {
                            mappedName: results.data[0][row].toLowerCase().trim(),
                            valid: true
                        };
                    } else {
                        this.finalColumnMapping[results.data[0][row]] = {
                            mappedName: undefined,
                            valid: false
                        };
                    }
                }
                this.dataSource = data;
            }
        }

        let reader = new FileReader()
        reader.onload = (e) => {
            this.papa.parse(reader.result.toString(), options);
        }

        reader.readAsText(this.uploadedFile)
    }

    verifyMapping(){
        for(let key in this.finalColumnMapping){
            if(!this.finalColumnMapping[key].valid)
                return false;
        }

        return true;
    }

    verifyAndOpenUploadDialog() {
        if(!this.verifyMapping())
            return;

        let dialogRef = this.dialog.open(UploadDialogComponent)
        let dialogInstance = dialogRef.componentInstance;
        dialogInstance.uploadedFile = this.uploadedFile;
        dialogInstance.mappedHeaders = this.finalColumnMapping;
        dialogInstance.county = this.countyFormStep.controls["county"].value;
        dialogInstance.categories = this.categories;
        dialogRef.afterClosed().subscribe((success) => {
            console.log(success);
        });
    }
}
