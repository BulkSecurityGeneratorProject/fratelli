/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FratelliTestModule } from '../../../test.module';
import { ChoferDetailComponent } from '../../../../../../main/webapp/app/entities/chofer/chofer-detail.component';
import { ChoferService } from '../../../../../../main/webapp/app/entities/chofer/chofer.service';
import { Chofer } from '../../../../../../main/webapp/app/entities/chofer/chofer.model';

describe('Component Tests', () => {

    describe('Chofer Management Detail Component', () => {
        let comp: ChoferDetailComponent;
        let fixture: ComponentFixture<ChoferDetailComponent>;
        let service: ChoferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [ChoferDetailComponent],
                providers: [
                    ChoferService
                ]
            })
            .overrideTemplate(ChoferDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChoferDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChoferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Chofer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chofer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
