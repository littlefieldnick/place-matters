import { Component, OnInit } from '@angular/core';
import {ResourceCategory} from "../../../../models/resource_category";
import {CategoryService} from "../../../../services/category.service";
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  displayedColumns = ["id", "name", "description", "action"]
  dataSource = this.categoryService.getCategories();
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

  }

}
