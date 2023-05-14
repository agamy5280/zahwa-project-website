import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  currentRoute: string = '';
  currentKey: string = '';
  currentParams: string = '';
  constructor(private _router: Router, private route: ActivatedRoute, private productService: ProductsService){}

  ngOnInit(): void {
    this.currentRoute = this._router.url.split('?')[0];
    this.currentRoute = this.currentRoute.replace('/','')
    this.route.queryParamMap.subscribe(async params =>{
      this.currentKey = params.keys[0]
      this.currentParams = params['params'][this.currentKey]
      if(Number(this.currentParams)) {
        ( await this.productService.getProductByID(Number(this.currentParams))).subscribe((data:object) => {
          this.currentParams = data['title']
        })
      }
    })
  }
}
