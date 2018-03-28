/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketDialogComponent } from '../../../../../../main/webapp/app/entities/ticket/ticket-dialog.component';
import { TicketService } from '../../../../../../main/webapp/app/entities/ticket/ticket.service';
import { Ticket } from '../../../../../../main/webapp/app/entities/ticket/ticket.model';
import { RequestService } from '../../../../../../main/webapp/app/entities/request';
import { TicketStatusService } from '../../../../../../main/webapp/app/entities/ticket-status';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee';

describe('Component Tests', () => {

    describe('Ticket Management Dialog Component', () => {
        let comp: TicketDialogComponent;
        let fixture: ComponentFixture<TicketDialogComponent>;
        let service: TicketService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketDialogComponent],
                providers: [
                    RequestService,
                    TicketStatusService,
                    EmployeeService,
                    TicketService
                ]
            })
            .overrideTemplate(TicketDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ticket(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ticket = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ticketListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ticket();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ticket = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ticketListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
