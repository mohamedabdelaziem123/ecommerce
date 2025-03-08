import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  loged: boolean = false;
  constructor(private flowbiteService: FlowbiteService, public authservice:AuthService,public cartservice:CartService) {}

  ngOnInit(): void {

    this.authservice.userData.subscribe(
      res=>{
        if (res != null) {
          this.loged = true;
        }
        else {
          this.loged = false;
        }
     }
   )

    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
