import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements  OnInit {
  productID: number = 0;
  targetProductData = [];
  productCategory: string = '';
  youMayLikeProducts = [];
  youMayLikeProductsID: number = 0;
  userReviews = [];
  userReviewsQuantity: number = 0;
  productRating: number;
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private prodService:ProductsService,
    protected localStorageService: LocalstorageService){
  // checking if path shop-detail is active.
  if(_router.url == '/shop-detail'){
    this._router.navigate(['shop']);
  }
}
async ngOnInit(){
  //getting product data
  this.route.queryParams.subscribe(async params => {
    this.productID = params['product'];
    (await this.prodService.getProductByID(this.productID)).subscribe(async (data:any) => {
      this.targetProductData = data;
      this.productCategory = data.category;
      this.productRating = Number(JSON.stringify(data.rating));
      // Getting products similar in category.
      (await this.prodService.getProductByCategory(this.productCategory)).subscribe((data:any) => {
        this.youMayLikeProducts = data.products;
      });
      // Getting user reviews from API.
      (await this.prodService.getUserReviews()).subscribe((data:any) => {
        this.userReviews = data.users;
        this.userReviewsQuantity = this.userReviews.length;
      })
    });
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
  this.localStorageService.addProductToLocalStorage(product, 1)
  this._router.navigate(['/cart']);
}
}
