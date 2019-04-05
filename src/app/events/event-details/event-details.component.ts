import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared';

@Component({
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit {
 
    event: IEvent
    addMode: boolean
    filterBy: string = 'all'
    sortBy: string = 'votes'

    constructor(private eventService:EventService, private route:ActivatedRoute) {

    }

    ngOnInit(): void {
        let id: number = +this.route.snapshot.params['id']
        this.event = this.eventService.getEvent(id)
    }

    addSession() {
        this.addMode = true
    }

    saveNewSession(session: ISession) {
        const maxId: number = Math.max.apply(null, this.event.sessions.map(s => s.id))
        session.id = maxId + 1

        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }

    cancelAddSession() {
        this.addMode = false
    }
}