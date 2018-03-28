/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hrsystem1TestModule } from '../../../test.module';
import { HumanResourceUserDetailComponent } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user-detail.component';
import { HumanResourceUserService } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.service';
import { HumanResourceUser } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.model';

describe('Component Tests', () => {

    describe('HumanResourceUser Management Detail Component', () => {
        let comp: HumanResourceUserDetailComponent;
        let fixture: ComponentFixture<HumanResourceUserDetailComponent>;
        let service: HumanResourceUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [HumanResourceUserDetailComponent],
                providers: [
                    HumanResourceUserService
                ]
            })
            .overrideTemplate(HumanResourceUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HumanResourceUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HumanResourceUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new HumanResourceUser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.humanResourceUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
