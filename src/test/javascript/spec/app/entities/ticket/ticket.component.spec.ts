/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketComponent } from '../../../../../../main/webapp/app/entities/ticket/ticket.component';
import { TicketService } from '../../../../../../main/webapp/app/entities/ticket/ticket.service';
import { Ticket } from '../../../../../../main/webapp/app/entities/ticket/ticket.model';

describe('Component Tests', () => {

    describe('Ticket Management Component', () => {
        let comp: TicketComponent;
        let fixture: ComponentFixture<TicketComponent>;
        let service: TicketService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketComponent],
                providers: [
                    TicketService
                ]
            })
            .overrideTemplate(TicketComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Ticket(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tickets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
