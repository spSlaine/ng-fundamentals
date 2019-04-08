import { Toastr } from './../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './shared/event.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IEvent } from '.';

@Component({
    templateUrl: './events-list.component.html'
})

export class EventsListComponent implements OnInit {
    events: IEvent[];

    constructor(private eventService: EventService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }
}
