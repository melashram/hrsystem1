/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Hrsystem1TestModule } from '../../../test.module';
import { HumanResourceUserDialogComponent } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user-dialog.component';
import { HumanResourceUserService } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.service';
import { HumanResourceUser } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.model';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee';

describe('Component Tests', () => {

    describe('HumanResourceUser Management Dialog Component', () => {
        let comp: HumanResourceUserDialogComponent;
        let fixture: ComponentFixture<HumanResourceUserDialogComponent>;
        let service: HumanResourceUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [HumanResourceUserDialogComponent],
                providers: [
                    EmployeeService,
                    HumanResourceUserService
                ]
            })
            .overrideTemplate(HumanResourceUserDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HumanResourceUserDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HumanResourceUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HumanResourceUser(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.humanResourceUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'humanResourceUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HumanResourceUser();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.humanResourceUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'humanResourceUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
