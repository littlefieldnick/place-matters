import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {County} from "../../../models/county";
import {ResourceService} from "../../../services/resource.service";
import {CsvUploadService} from "../../../services/csv-upload.service";
import { Papa } from "ngx-papaparse";
import {forkJoin, from, Observable} from "rxjs";
import {CsvHeader} from "../../../models/csv-record";
import {AppConfigService} from "../../../services/app-config.service";

@Component({
  selector: 'resource-csv-upload',
  templateUrl: './resource-csv-upload.component.html',
  styleUrls: ['./resource-csv-upload.component.scss']
})
export class ResourceCsvUploadComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  uploadedFile: File;
  countyFormStep: FormGroup;
  csvFormStep: FormGroup;
  countyListing: Array<County>;
  progress: {[key: string]: any};
  dataSource: CsvHeader[];
  uploading: boolean = false;
  uploadSuccessful: boolean = false;
  displayedColumns = ["csvColumn", "example", "dbColumn"];
  resourceDbColumnNames = this.appConfigService.resourceDbColumnMappingLabels;
  constructor(private papa: Papa, private formBuilder: FormBuilder, private appConfigService: AppConfigService,
              private resourceService: ResourceService, private uploader: CsvUploadService) {

  }
  ngOnInit(): void {
    this.resourceService.getCounties().subscribe((counties) => {
      this.countyListing = counties["data"];
    });

    this.countyFormStep = this.formBuilder.group({
      county: ['', Validators.required]
    });

    this.csvFormStep = this.formBuilder.group({
      csv: ['', Validators.required]
    })
  }

  addFiles(){
    this.file.nativeElement.click();
  }

  onFilesAdded(event){
    this.uploadedFile = (event.target as HTMLInputElement).files[0];
    this.csvFormStep.patchValue({'csv': this.uploadedFile});
    this.csvFormStep.get('csv').updateValueAndValidity();

    this.getCsvHeaders();
  }

  parseFile() {

  }

  attemptColumnMapping(column){
    let idx = this.resourceDbColumnNames.indexOf(column.toLowerCase())
    if (idx > -1)
      return this.resourceDbColumnNames[idx];
  }

  getCsvHeaders(){
    let options = {
      header: false,
      preview: 2,
      complete: (results, file) => {
        console.log("Processing headers!");
        let data = []
        for(let row = 0; row < results.data[0].length; row++){
          data.push(new CsvHeader(results.data[0][row], results.data[1][row]));
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

  uploadFiles(){
    this.uploading = true;

    this.progress = this.uploader.upload(this.csvFormStep.controls['csv'].value);
    console.log(this.progress);

    for(let key in this.progress){
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    //When all progress is completed, set uploading to false to move on the next step!
    forkJoin(allProgressObservables).subscribe((end) =>{
      this.uploading = false;
      this.uploadSuccessful = true;
    })
  }
}
