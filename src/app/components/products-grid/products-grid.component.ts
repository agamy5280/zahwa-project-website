import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  products: [] = [];
  categoryName: string = '';
  page: number;
  productsQuantity: number;
  myLocalStorageUserData = JSON.parse(localStorage.getItem('loggedUser')) || '';
  constructor(private _router: Router, private route: ActivatedRoute, private productService: ProductsService, private localStorageService: LocalstorageService) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      if(params['category']) {
        this.categoryName = params['category'];
        (await this.productService.getProductByCategory(this.categoryName)).subscribe((data:any) => {
          this.products = data.products;
          this.productsQuantity = data.total;
          this.page = 0;
        })
      }  else {
        (await this.productService.getProducts()).subscribe((data:any)=>{
         this.products = data.products;
         this.productsQuantity = data.total;
         this.page = 0;
       })
     }
    })
  }
  redirectToProductPage(id:number){
    this._router.navigate(['shop-detail'], {
      queryParams: {
        product: id,
      },
    });
  }
  addProductToCart(product:object) {
    if(this.myLocalStorageUserData){
      this.localStorageService.addProductToLocalStorage(product, 1)
    }else {
      this._router.navigate(['/login'])
    }
  }
}
