import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventService } from './shared/event.service';
import { map } from 'rxjs/operators';
import { IEvent } from '.';
import { Observable } from 'rxjs';

@Injectable()

export class EventResolver implements Resolve<IEvent> {
    constructor(private eventService: EventService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent> {
        return this.eventService.getEvent(route.params['id']);
    }
}
