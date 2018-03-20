/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FratelliTestModule } from '../../../test.module';
import { ChoferComponent } from '../../../../../../main/webapp/app/entities/chofer/chofer.component';
import { ChoferService } from '../../../../../../main/webapp/app/entities/chofer/chofer.service';
import { Chofer } from '../../../../../../main/webapp/app/entities/chofer/chofer.model';

describe('Component Tests', () => {

    describe('Chofer Management Component', () => {
        let comp: ChoferComponent;
        let fixture: ComponentFixture<ChoferComponent>;
        let service: ChoferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [ChoferComponent],
                providers: [
                    ChoferService
                ]
            })
            .overrideTemplate(ChoferComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChoferComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChoferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Chofer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chofers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
