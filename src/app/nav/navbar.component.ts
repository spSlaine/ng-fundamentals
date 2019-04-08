import { EventService } from './../events/shared/event.service';
import { AuthService } from './../user/auth.service';
import { Component } from '@angular/core';
import { ISession } from '../events';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent {
    searchTerm = '';
    foundSessions: ISession[];

    constructor(public auth: AuthService,
        private eventService: EventService) {

    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
        });
    }
}
