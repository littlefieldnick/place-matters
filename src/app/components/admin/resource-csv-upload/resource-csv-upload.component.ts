import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {County} from "../../../models/county";
import {ResourceService} from "../../../services/resource.service";

@Component({
  selector: 'resource-csv-upload',
  templateUrl: './resource-csv-upload.component.html',
  styleUrls: ['./resource-csv-upload.component.scss']
})
export class ResourceCsvUploadComponent implements OnInit {
  countyFormStep: FormGroup;
  fileUploadStep: FormGroup;
  countyListing: Array<County>;

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(private formBuilder: FormBuilder, private resourceService: ResourceService) {

  }

  ngOnInit(): void {
    this.resourceService.getCounties().subscribe((counties) => {
      this.countyListing = counties["data"];
    });

    this.countyFormStep = this.formBuilder.group({
      county: ['', Validators.required]
    })
  }

}
