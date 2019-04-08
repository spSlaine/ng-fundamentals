import { VoterService } from './voter.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { ISession } from '../shared/event.model';


describe('VoterService', () => {
    let injector: TestBed;
    let service: VoterService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VoterService],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        service = injector.get(VoterService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });


    describe('deleteVoter', () => {
        it('should remove the voter from list of voters', () => {
            const session = {
                id: 6,
                voters: ['joe', 'john']
            };

            service.deleteVoter(3, <ISession>session, 'joe');
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');

            const req = httpMock.expectOne('/api/events/3/sessions/6/voters/joe');
            expect(req.request.method).toBe('DELETE');
            req.flush({});
        });
    });


    describe('addVoter', () => {
        it('should call http.post with right URL', () => {
            const session = {
                id: 6,
                voters: ['john']
            };

            service.addVoter(3, <ISession>session, 'joe');

            expect(session.voters.length).toBe(2);
            expect(session.voters).toEqual(['john', 'joe']);

            const req = httpMock.expectOne('/api/events/3/sessions/6/voters/joe');
            expect(req.request.method).toBe('POST');
            req.flush({});
        });
    });
});
