import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'shop-detail', component: ProductDetailComponent },
  { path:'**', pathMatch: 'full', component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
