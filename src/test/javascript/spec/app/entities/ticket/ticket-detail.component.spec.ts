/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketDetailComponent } from '../../../../../../main/webapp/app/entities/ticket/ticket-detail.component';
import { TicketService } from '../../../../../../main/webapp/app/entities/ticket/ticket.service';
import { Ticket } from '../../../../../../main/webapp/app/entities/ticket/ticket.model';

describe('Component Tests', () => {

    describe('Ticket Management Detail Component', () => {
        let comp: TicketDetailComponent;
        let fixture: ComponentFixture<TicketDetailComponent>;
        let service: TicketService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketDetailComponent],
                providers: [
                    TicketService
                ]
            })
            .overrideTemplate(TicketDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Ticket(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ticket).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
