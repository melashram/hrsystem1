/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Hrsystem1TestModule } from '../../../test.module';
import { ItUserComponent } from '../../../../../../main/webapp/app/entities/it-user/it-user.component';
import { ItUserService } from '../../../../../../main/webapp/app/entities/it-user/it-user.service';
import { ItUser } from '../../../../../../main/webapp/app/entities/it-user/it-user.model';

describe('Component Tests', () => {

    describe('ItUser Management Component', () => {
        let comp: ItUserComponent;
        let fixture: ComponentFixture<ItUserComponent>;
        let service: ItUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Hrsystem1TestModule],
                declarations: [ItUserComponent],
                providers: [
                    ItUserService
                ]
            })
            .overrideTemplate(ItUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ItUser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.itUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
