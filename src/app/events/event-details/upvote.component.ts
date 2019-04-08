import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'upvote',
    templateUrl: './upvote.component.html',
    styleUrls: ['./upvote.component.css']
})

export class UpvoteComponent {

    iconColor: string;

    @Input() count: number;

    @Input() set voted(val: boolean) {
        this.iconColor = val ? 'red' : 'white';
    }

    @Output() vote = new EventEmitter();

    onClick() {
        this.vote.emit({});
    }
}
