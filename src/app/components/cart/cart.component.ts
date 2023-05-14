import { Component, DoCheck } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements DoCheck{
  products: string [] = [];
  key: string = '';
  constructor(protected localStorageService: LocalstorageService){}
  ngDoCheck(){
    this.products = this.localStorageService.getProductsFromLocalStorage()
  }
}
