import { Component, Input } from '@angular/core';
import { IEvent } from './shared';

@Component({
    selector: 'event-thumbnail',
    templateUrl: './event-thumbnail.component.html',
    styleUrls: ['./event-thumbnail.component.css']
})

export class EventThumnailComponent {
    @Input() event: IEvent;

    getStartTimeStyle(): any {
        if (this.event && this.event.time === '8:00 am') {
            return { color: '#003300', 'font-weight': 'bold' };
        }

        return {};
    }
}
