import { VoterService } from './voter.service';
import { AuthService } from '../../user/auth.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared';

@Component({
    selector: 'session-list',
    templateUrl: '/session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string
    @Input() sortBy: string
    @Input() eventId: number

    visibleSessions: ISession[] = []

    constructor(private auth: AuthService, private voterService: VoterService) {

    }

    ngOnChanges(): void {
        if (this.sessions) {
            this.filterSessions(this.filterBy)
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }
    }

    filterSessions(filterBy: string): void {
        if (filterBy === 'all') {
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(s => {
                return s.level.toLocaleLowerCase() === filterBy
            })
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName)
        } else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName)
        }

        if (this.sortBy !== 'name') {
            this.visibleSessions.sort(sortByVotesDesc)
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }

}

function sortByNameAsc(s1: ISession, s2: ISession): number {
    if (s1.name > s2.name) return 1
    else if (s1.name === s2.name) return 0
    else return -1
}


function sortByVotesDesc(s1: ISession, s2: ISession): number {
    return s2.voters.length - s1.voters.length
}