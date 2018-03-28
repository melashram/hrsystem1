/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketStatusDialogComponent } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status-dialog.component';
import { TicketStatusService } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.service';
import { TicketStatus } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.model';

describe('Component Tests', () => {

    describe('TicketStatus Management Dialog Component', () => {
        let comp: TicketStatusDialogComponent;
        let fixture: ComponentFixture<TicketStatusDialogComponent>;
        let service: TicketStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketStatusDialogComponent],
                providers: [
                    TicketStatusService
                ]
            })
            .overrideTemplate(TicketStatusDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketStatusDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketStatusService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TicketStatus(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ticketStatus = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ticketStatusListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TicketStatus();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ticketStatus = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ticketStatusListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
