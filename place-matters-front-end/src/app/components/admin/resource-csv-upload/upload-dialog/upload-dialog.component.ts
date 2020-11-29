import {Component, Input, OnInit, Output} from '@angular/core';
import {Papa} from "ngx-papaparse";
import {Resource} from "../../../../models/resource";
import {ResourceService} from "../../../../services/resource.service";
import {ResourceCategory} from "../../../../models/resource_category";
import {CategoryService} from "../../../../services/category.service";
import {catchError} from "rxjs/operators";

@Component({
    selector: 'upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
    step: string;

    @Input()
    uploadedFile: File;

    @Input()
    mappedHeaders: Object;

    @Input()
    county: number;

    @Input()
    categories: Array<ResourceCategory>

    @Output()
    success: Object;


    constructor(private resourceService: ResourceService, private categoryService: CategoryService, private papa: Papa) {

    }

    ngOnInit(): void {
        this.uploadFile();
    }



    async uploadFile() {
        this.step = "Processing data...";
        let categories;

        let options = {
            header: true,
            transformHeader: (header) => {
                return this.mappedHeaders[header].mappedName;
            },

            complete: (results, file) => {
                let data = []


                for (let row = 0; row < results.data.length; row++) {
                    console.log(results.data[row]);
                    let resource = new Resource();
                    Object.assign(resource, results.data[row]);
                    resource.countyName = this.county;
                    resource.categoryName = -1;
                    for(let cat of this.categories) {

                        if (cat.categoryName == results.data[row].category) {
                            resource.categoryName = cat.id;
                        }
                    }
                    console.log(resource);
                    data.push(resource);
                };

                this.step = "Uploading data...";
                let uploadStatus = {};

                this.resourceService.bulkResourceSave(data).subscribe((re) => {
                    if (uploadStatus["success"]) {
                        this.step = "Uploading complete!";
                    } else {
                        this.step = "An error occurred while uploading the resources.";
                    }
                    this.success = uploadStatus["success"];
                }), catchError((err) => {
                    return err;
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
