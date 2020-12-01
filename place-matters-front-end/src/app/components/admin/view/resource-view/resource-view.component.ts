import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourceService} from "../../../../services/resource.service";
import {Observable} from "rxjs";
import {Resource} from "../../../../models/resource";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["id", "name", "category", "description", "county",];
  dataSource: MatTableDataSource<Resource[]>;
  resource;
  constructor(private resourceService: ResourceService) {


  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.resourceService.getResources().subscribe((resources) => {
      this.dataSource = new MatTableDataSource(resources["data"]);
      this.dataSource.paginator = this.paginator;
    })
  }

  setResource(resource){

    this.resource = resource;
    console.log(resource);
  }
}
