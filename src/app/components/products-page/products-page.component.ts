import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {
  selectedCategory: string;
  selectedCategoriesIndex: number;
  isCheckedAllCategories: boolean = true;
  constructor(private _router: Router, private route: ActivatedRoute) {}


  changeSelectionCategories(event, index) {
    // If checkboxes are not seleceted
    this.selectedCategoriesIndex = event.target.checked ? index : undefined;
    if (event.target.checked == false) {
      this.isCheckedAllCategories = true;
      this.selectedCategory = '';
      this._router.navigate([], {
        relativeTo: this.route,
      });
    } else {
      // If checkboxes are seleceted
      this.selectedCategory = event.target.value;
      this.isCheckedAllCategories = false;
      this._router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          category: this.selectedCategory,
        },
      });
    }
  }
}
