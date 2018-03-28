/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Hrsystem1TestModule } from '../../../test.module';
import { HumanResourceUserComponent } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.component';
import { HumanResourceUserService } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.service';
import { HumanResourceUser } from '../../../../../../main/webapp/app/entities/human-resource-user/human-resource-user.model';

describe('Component Tests', () => {

    describe('HumanResourceUser Management Component', () => {
        let comp: HumanResourceUserComponent;
        let fixture: ComponentFixture<HumanResourceUserComponent>;
        let service: HumanResourceUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [HumanResourceUserComponent],
                providers: [
                    HumanResourceUserService
                ]
            })
            .overrideTemplate(HumanResourceUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HumanResourceUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HumanResourceUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new HumanResourceUser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.humanResourceUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
