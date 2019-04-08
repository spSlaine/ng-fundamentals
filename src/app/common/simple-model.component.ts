import { Component, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQ_TOKEN } from './jquery.service';

@Component({
    selector: 'simple-model',
    templateUrl: './simple-model.component.html',
    styleUrls: ['./simple-model.component.css']
})

export class SimpleModeComponent {
    @Input() title: string
    @Input() elementId: string
    @Input() closeOnBodyClick: string

    @ViewChild('modalcontainer') containerEl: ElementRef

    constructor(@Inject(JQ_TOKEN) private $: any) {

    }

    closeModal() {
        if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
            this.$(this.containerEl.nativeElement).modal('hide')
        }
    }
}