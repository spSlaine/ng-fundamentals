import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './../../user/auth.service';
import { DurationPipe } from './../shared/duration.pipe';
import { SessionListComponent } from './session-list.component';
import { VoterService } from './voter.service';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEL: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {
                userName: 'Joe'
            }
        };

        const mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                DurationPipe
            ],
            providers: [
                {
                    provide: AuthService, useValue: mockAuthService
                },
                {
                    provide: VoterService, useValue: mockVoterService
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEL = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('inital display', () => {
        it('should have the correct session name', () => {
            component.sessions = [
                {
                    'id': 1,
                    'name': 'Using Angular 4 Pipes',
                    'presenter': 'Peter Bacon Darwin',
                    'duration': 1,
                    'level': 'Intermediate',
                    'abstract': 'Learn all about the new pipes in Angular 4, both how to write them, and how to get the new AI CLI to write them for you. Given by the famous PBD, president of Angular University (formerly Oxford University)',
                    'voters': ['bradgreen', 'igorminar']
                },
                {
                    'id': 2,
                    'name': 'Getting the most out of your dev team',
                    'presenter': 'Jeff Cross',
                    'duration': 1,
                    'level': 'Intermediate',
                    'abstract': 'We all know that our dev teams work hard, but with the right management they can be even more productive, without overworking them. In this session I\'ll show you how to get the best results from the talent you already have on staff.',
                    'voters': ['johnpapa', 'bradgreen', 'igorminar', 'martinfowler']
                }
            ];

            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            const titles =
                element.querySelectorAll('[well-title]');
            // debugEL.query(By.css('[well-title]'))

            expect(titles.length).toEqual(2);

            expect(titles[0].textContent.trim()).toEqual('Getting the most out of your dev team');
            expect(titles[1].textContent.trim()).toEqual('Using Angular 4 Pipes');
        });

        it('sessions with more than 3 votes should have icon displayed', () => {
            component.sessions = [
                {
                    'id': 1,
                    'name': 'A Using Angular 4 Pipes',
                    'presenter': 'Peter Bacon Darwin',
                    'duration': 1,
                    'level': 'Intermediate',
                    'abstract': 'Learn all about the new pipes in Angular 4, both how to write them, and how to get the new AI CLI to write them for you. Given by the famous PBD, president of Angular University (formerly Oxford University)',
                    'voters': []
                },
                {
                    'id': 2,
                    'name': 'B Using Angular 4 Pipes',
                    'presenter': 'Peter Bacon Darwin',
                    'duration': 1,
                    'level': 'Intermediate',
                    'abstract': 'Learn all about the new pipes in Angular 4, both how to write them, and how to get the new AI CLI to write them for you. Given by the famous PBD, president of Angular University (formerly Oxford University)',
                    'voters': ['bradgreen', 'igorminar']
                },
                {
                    'id': 3,
                    'name': 'C Getting the most out of your dev team',
                    'presenter': 'Jeff Cross',
                    'duration': 1,
                    'level': 'Intermediate',
                    'abstract': 'We all know that our dev teams work hard, but with the right management they can be even more productive, without overworking them. In this session I\'ll show you how to get the best results from the talent you already have on staff.',
                    'voters': ['johnpapa', 'bradgreen', 'igorminar']
                },
                {
                    'id': 4,
                    'name': 'D Getting the most out of your dev team',
                    'presenter': 'Jeff Cross',
                    'duration': 1,
                    'level': 'Intermediate',
                    'abstract': 'We all know that our dev teams work hard, but with the right management they can be even more productive, without overworking them. In this session I\'ll show you how to get the best results from the talent you already have on staff.',
                    'voters': ['johnpapa', 'bradgreen', 'igorminar', 'martinfowler']
                }
            ];

            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            const titles =
                element.querySelectorAll('[well-title]');

            const firstSession = titles[0].querySelector('i');
            expect(firstSession).toBeFalsy();

            const secondSession = titles[1].querySelector('i');
            expect(secondSession).toBeFalsy();

            const thirdSession = titles[2].querySelector('i');
            expect(thirdSession).toBeFalsy();

            const fourthSession = titles[3].querySelector('i');
            expect(fourthSession).toBeTruthy();

        });
    });
});
