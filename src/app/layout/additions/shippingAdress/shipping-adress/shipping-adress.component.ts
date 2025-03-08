import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../../shared/services/orders/orders.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CartService } from '../../../../shared/services/cart/cart.service';


@Component({
  selector: 'app-shipping-adress',
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-adress.component.html',
  styleUrl: './shipping-adress.component.scss'
})
export class ShippingAdressComponent implements OnInit{
  inputword:string="payment method"
  isOpen: boolean = false;
  validaddress:string="";
  cartid!:string
  
 
  constructor(private orderservice: OrdersService, private route: ActivatedRoute, private router: Router, private cartservice: CartService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: res => {
        this.cartid=res.get("cartid")||''
       
        
      }
    })
  }
  
  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })
  shippingsubmit() {
  
    if (this.shippingForm.valid && this.inputword != "payment method") {
      
      if (this.inputword == "pay by visa") {
        
        this.orderservice.checkout(this.cartid!,this.shippingForm.value).subscribe({
          next: res => {
            window.open(res.session.url, "_self");
          
            
          },
          error: err => {
            
          }
      })
      }
      else {
   
        this.orderservice.cashOnDelivery(this.cartid!,this.shippingForm.value).subscribe({
          next: res => {
            this.router.navigate(["/allorders"])
            this.cartservice.clearcartitem().subscribe(res => { this.cartservice.NoItems.next(0) });
            
          
            
          },
          error: err => {
            
          }
      })
      }
      
      
      
     
      
    }
    else {
      this.validaddress="please make sure to enter all the required information correctly"
    }
  }

  toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu')!;
    this.isOpen = !this.isOpen;
    dropdownMenu.classList.toggle('hidden', !this.isOpen);
  }
  changeinputword(index: number) {
    const options: string[] = ["payment method", "pay on delivery", "pay by visa"]
    this.inputword = options[index]
    
  }

  
  
  
 
}
