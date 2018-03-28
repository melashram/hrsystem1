/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketStatusComponent } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.component';
import { TicketStatusService } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.service';
import { TicketStatus } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.model';

describe('Component Tests', () => {

    describe('TicketStatus Management Component', () => {
        let comp: TicketStatusComponent;
        let fixture: ComponentFixture<TicketStatusComponent>;
        let service: TicketStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketStatusComponent],
                providers: [
                    TicketStatusService
                ]
            })
            .overrideTemplate(TicketStatusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TicketStatus(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ticketStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
