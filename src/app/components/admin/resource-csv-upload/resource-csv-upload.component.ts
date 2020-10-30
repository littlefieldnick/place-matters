import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {County} from "../../../models/county";
import {ResourceService} from "../../../services/resource.service";

@Component({
  selector: 'resource-csv-upload',
  templateUrl: './resource-csv-upload.component.html',
  styleUrls: ['./resource-csv-upload.component.scss']
})
export class ResourceCsvUploadComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  uploadedFile: File;
  countyFormStep: FormGroup;
  countyListing: Array<County>;
  uploading: boolean = false;
  uploadSuccessful: boolean = false;

  constructor(private formBuilder: FormBuilder, private resourceService: ResourceService) {

  }

  ngOnInit(): void {
    this.resourceService.getCounties().subscribe((counties) => {
      this.countyListing = counties["data"];
    });

    this.countyFormStep = this.formBuilder.group({
      county: ['', Validators.required]
    });
  }

  addFiles(){
    this.file.nativeElement.click();
  }

  onFilesAdded(){
    let selectedFile = this.file.nativeElement.files[0];
    console.log(selectedFile);
    this.uploadedFile = selectedFile;
  }
}
