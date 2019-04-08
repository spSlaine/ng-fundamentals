import { Injectable } from "@angular/core";

@Injectable()
export class VoterService {
    userHasVoted(session: import("..").ISession, voterName: string): boolean {
        return session.voters.some(voter => voter === voterName)
    }
    addVoter(session: import("..").ISession, voterName: string) {
        session.voters.push(voterName)
    }
    deleteVoter(session: import("..").ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName)
    }

}
