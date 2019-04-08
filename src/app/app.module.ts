import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'


import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';

import { Toastr, CollaspibeWellComponent, TOASTR_TOKEN, JQ_TOKEN, SimpleModeComponent, ModalTriggerDirective } from './common';

import {
  EventsListComponent,
  EventDetailsComponent,
  EventThumnailComponent,
  CreateEventComponent,
  EventListResolver,
  SessionListComponent,
  CreateSessionComponent,
  EventService,
  DurationPipe,
  VoterService,
  LocationValidatorDirective,
  UpvoteComponent,
  EventResolver
} from './events'

import { NavBarComponent } from './nav/navbar.component'
import { EventsAppComponent } from './events-app.component';
import { appRoutes } from './routes';

let toastr: Toastr = window['toastr']
let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    NavBarComponent,
    Error404Component,
    SessionListComponent,
    CollaspibeWellComponent,
    DurationPipe,
    SimpleModeComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective
  ],
  providers: [
    EventService,
    EventResolver,
    EventListResolver,
    AuthService,
    VoterService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you want to cancel?')
  }

  return true
}
