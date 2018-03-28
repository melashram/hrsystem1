/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Hrsystem1TestModule } from '../../../test.module';
import { HumanResourceUserDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user-delete-dialog.component';
import { HumanResourceUserService } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.service';

describe('Component Tests', () => {

    describe('HumanResourceUser Management Delete Component', () => {
        let comp: HumanResourceUserDeleteDialogComponent;
        let fixture: ComponentFixture<HumanResourceUserDeleteDialogComponent>;
        let service: HumanResourceUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [HumanResourceUserDeleteDialogComponent],
                providers: [
                    HumanResourceUserService
                ]
            })
            .overrideTemplate(HumanResourceUserDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HumanResourceUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HumanResourceUserService);
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
