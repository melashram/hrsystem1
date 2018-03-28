/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketStatusDetailComponent } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status-detail.component';
import { TicketStatusService } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.service';
import { TicketStatus } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.model';

describe('Component Tests', () => {

    describe('TicketStatus Management Detail Component', () => {
        let comp: TicketStatusDetailComponent;
        let fixture: ComponentFixture<TicketStatusDetailComponent>;
        let service: TicketStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketStatusDetailComponent],
                providers: [
                    TicketStatusService
                ]
            })
            .overrideTemplate(TicketStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TicketStatus(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ticketStatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
