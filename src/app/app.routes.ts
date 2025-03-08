import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { ProductComponent } from './layout/pages/product/product.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { nobackloginGuard } from './shared/guards/nobacklogin/nobacklogin.guard';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ShippingAdressComponent } from './layout/additions/shippingAdress/shipping-adress/shipping-adress.component';
import { AllordersComponent } from './layout/additions/Allorders/allorders/allorders.component';
import { WishListComponent } from './layout/pages/wishList/wish-list/wish-list.component';


export const routes: Routes = [
    { path: "", redirectTo: "home" , pathMatch: 'full' },
    {path:"wishlist", component:WishListComponent,canActivate:[authGuard] , title:"wishlist"},
    { path: 'allorders', component: AllordersComponent,canActivate:[authGuard] , title: "allorders" },
    { path: 'home', component: HomeComponent,canActivate:[authGuard] , title: "home" },
    {path:'shippingaddress/:cartid', component:ShippingAdressComponent,canActivate:[authGuard] ,title:"shippingaddress"},
    { path: 'cart', component: CartComponent, canActivate:[authGuard] , title: "cart" },
    { path: 'products', component: ProductComponent,canActivate:[authGuard] , title: "product" },
    { path: 'productDetails/:_id', component:ProductDetailsComponent,canActivate:[authGuard] , title: "productDetails" },
    { path: 'forgetPassword', component:ForgetPasswordComponent, title: "forgetPassword" },
    { path: 'categories', loadComponent:()=>import("./layout/pages/categories/categories.component").then((cls)=>cls.CategoriesComponent),canActivate:[authGuard] ,title: "categories" },
    { path: 'brands', loadComponent:()=>import("./layout/pages/brands/brands.component").then((cls)=>cls.BrandsComponent),canActivate:[authGuard] , title: "brands" },
    { path: 'login', component:LoginComponent, canActivate:[nobackloginGuard],  title: "login" },
    { path: 'register', component:RegisterComponent, canActivate:[nobackloginGuard],   title: "register" },
    { path: '**', component:NotfoundComponent, title: "404" }
    
];
