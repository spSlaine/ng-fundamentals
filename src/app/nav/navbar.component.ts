import { AuthService } from './../user/auth.service';
import { Component } from '@angular/core'

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent {
    constructor(public auth: AuthService) {
        
    }
}