import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  featuredProducts = [];
  myLocalStorageUserData = JSON.parse(localStorage.getItem('loggedUser')) || '';
  constructor(private prodService:ProductsService, private _router: Router,private localStorageService: LocalstorageService) {}

  async ngOnInit(): Promise<void> {
    (await this.prodService.getProductByFlowers()).subscribe((data:any)=>{
      this.featuredProducts = data.products;
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
