import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {County} from "../../../models/county";
import {ResourceService} from "../../../services/resource.service";
import {CsvUploadService} from "../../../services/csv-upload.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'resource-csv-upload',
  templateUrl: './resource-csv-upload.component.html',
  styleUrls: ['./resource-csv-upload.component.scss']
})
export class ResourceCsvUploadComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  uploadedFiles: Set<File> = new Set();
  countyFormStep: FormGroup;
  csvFormStep: FormGroup;
  countyListing: Array<County>;
  progress: {[key: string]: any};
  uploading: boolean = false;
  uploadSuccessful: boolean = false;

  constructor(private formBuilder: FormBuilder,
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
      csv: ['']
    })
  }

  addFiles(){
    this.file.nativeElement.click();
  }

  onFilesAdded(event){
    let selectedFiles = (event.target as HTMLInputElement).files;
    this.csvFormStep.patchValue({'csv': selectedFiles});
    this.csvFormStep.get('csv').updateValueAndValidity();

    console.log(this.csvFormStep.controls['csv'].value);
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
    })
  }
}
