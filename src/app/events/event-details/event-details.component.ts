import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
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
        this.route.data.forEach((data) => {
            this.event = data['event']
            this.addMode = false
            this.filterBy = 'all'
            this.sortBy = 'votes'
        })
    }

    addSession() {
        this.addMode = true
    }

    saveNewSession(session: ISession) {
        const maxId: number = Math.max.apply(null, this.event.sessions.map(s => s.id))
        session.id = maxId + 1

        this.event.sessions.push(session)
        this.eventService.saveEvent(this.event).subscribe()
        this.addMode = false
    }

    cancelAddSession() {
        this.addMode = false
    }
}