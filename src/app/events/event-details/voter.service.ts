import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable()
export class VoterService {

    constructor(private http: HttpClient) {

    }

    private handleError<T>(operation: string = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error)
            return of(result as T)
        }
    }

    userHasVoted(session: import("..").ISession, voterName: string): boolean {
        return session.voters.some(voter => voter === voterName)
    }

    addVoter(eventId: number, session: import("..").ISession, voterName: string) {
        session.voters.push(voterName)

        const options = {
            headers: new HttpHeaders(
                {
                    'Content-Type': '/application/json'
                }
            )
        }
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.post(url, {}, options)
            .pipe(catchError(this.handleError('addVoter')))
            .subscribe()
    }
    
    deleteVoter(eventId: number, session: import("..").ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName)

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.delete(url)
            .pipe(catchError(this.handleError('deleteVoter')))
            .subscribe()
    }

}
