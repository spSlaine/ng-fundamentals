import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared';

describe('SessionListComponent', () => {

    let component: SessionListComponent
    let mockAuthService, mockVoterService


    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService)
    });

    afterEach(() => {

    });


    describe('ngOnChanges', () => {

        it('should filter the intermediate sessions correctly', () => {
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 2', level: 'intermediate' },
                { name: 'session 3', level: 'beginner' },
                { name: 'session 4', level: 'beginner' }
            ]

            component.filterBy = 'intermediate'
            component.sortBy = 'name'
            component.eventId = 3

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(2)
        })

        it('should filter the beginner sessions correctly', () => {
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 2', level: 'intermediate' },
                { name: 'session 3', level: 'beginner' }
            ]

            component.filterBy = 'beginner'
            component.sortBy = 'name'
            component.eventId = 3

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(1)
        })

        
        it('should filter the advanced sessions correctly', () => {
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 2', level: 'intermediate' },
                { name: 'session 3', level: 'beginner' }
            ]

            component.filterBy = 'advanced'
            component.sortBy = 'name'
            component.eventId = 3

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(0)
        })

        it('should sort the sessions correctly', () => {
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 4', level: 'beginner' },
                { name: 'session 2', level: 'intermediate' },
                { name: 'session 3', level: 'beginner' }
            ]

            component.filterBy = 'all'
            component.sortBy = 'name'
            component.eventId = 3

            component.ngOnChanges();

            expect(component.visibleSessions[3].name).toBe('session 4')
        })
    })

})