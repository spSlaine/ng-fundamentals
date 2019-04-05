import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { EventService, IEvent } from './shared';
import { inherits } from 'util';

@Component({
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent {

    isDirty: boolean = false
    constructor(private router: Router, private eventService: EventService) {

    }

    saveEvent(formValues: any) {
        this.eventService.saveEvent(formValues)
        this.isDirty = false
        this.router.navigate(['/events'])
    }

    cancel() {
        this.router.navigate(['/events'])
    }
}