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
  displayedColumns = ["id", "name"]
  dataSource = this.categoryService.getCategories();
  category;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

  }

  setCategory(category){
    this.category = category;
  }

}
