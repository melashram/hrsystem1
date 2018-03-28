/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hrsystem1TestModule } from '../../../test.module';
import { ItUserDetailComponent } from '../../../../../../main/webapp/app/entities/it-user/it-user-detail.component';
import { ItUserService } from '../../../../../../main/webapp/app/entities/it-user/it-user.service';
import { ItUser } from '../../../../../../main/webapp/app/entities/it-user/it-user.model';

describe('Component Tests', () => {

    describe('ItUser Management Detail Component', () => {
        let comp: ItUserDetailComponent;
        let fixture: ComponentFixture<ItUserDetailComponent>;
        let service: ItUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [ItUserDetailComponent],
                providers: [
                    ItUserService
                ]
            })
            .overrideTemplate(ItUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ItUser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.itUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
