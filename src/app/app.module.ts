import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { CollaspibeWellComponent } from './common/collapsible-well.component';

import {
  EventsListComponent,
  EventDetailsComponent,
  EventThumnailComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  SessionListComponent,
  CreateSessionComponent,
  EventService,
  DurationPipe
} from './events'

import { NavBarComponent } from './nav/navbar.component'
import { appRoutes } from './routes';
import { EventsAppComponent } from './events-app.component';

declare let toastr: Toastr

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
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
    DurationPipe
  ],
  providers: [
    EventService,
    EventRouteActivator,
    EventListResolver,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
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
