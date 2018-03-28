/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Hrsystem1TestModule } from '../../../test.module';
import { TicketStatusDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status-delete-dialog.component';
import { TicketStatusService } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.service';

describe('Component Tests', () => {

    describe('TicketStatus Management Delete Component', () => {
        let comp: TicketStatusDeleteDialogComponent;
        let fixture: ComponentFixture<TicketStatusDeleteDialogComponent>;
        let service: TicketStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [TicketStatusDeleteDialogComponent],
                providers: [
                    TicketStatusService
                ]
            })
            .overrideTemplate(TicketStatusDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketStatusService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
