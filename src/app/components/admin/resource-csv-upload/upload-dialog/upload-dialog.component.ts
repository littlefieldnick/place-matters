import {Component, Input, OnInit} from '@angular/core';
import {CsvUploadService} from "../../../../services/csv-upload.service";
import {Papa} from "ngx-papaparse";
import {CsvHeader} from "../../../../models/csv-record";
import {Resource} from "../../../../models/resource";
import {ResourceService} from "../../../../services/resource.service";

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  step: string;
  parsedResources: Resource[] = [];

  @Input()
  uploadedFile: File;

  @Input()
  mappedHeaders: Object;

  constructor(private resourceService: ResourceService, private papa: Papa) {

  }

  ngOnInit(): void {
    this.uploadFile();
  }

  uploadFile(){
    this.step = "Processing data...";
    let options = {
      header: true,
      transformHeader: (header) => {
        return this.mappedHeaders[header];
      },

      complete: (results, file) => {

        let data = []
        for(let row = 0; row < results.data.length; row++){
          let resource = new Resource();
          Object.assign(resource, results.data[row]);
          data.push(resource);
        }

        this.step = "Uploading data...";
        this.resourceService.bulkResourceSave(data).subscribe((data) => {
          if(data["success"])
            this.step = "Uploading complete!";
          else
            this.step = "An error occurred while uploading the resources.";
        });
      }
    }

    let reader = new FileReader()
    reader.onload = (e) => {
      this.papa.parse(reader.result.toString(), options);
    }
    reader.readAsText(this.uploadedFile)
  }

}
