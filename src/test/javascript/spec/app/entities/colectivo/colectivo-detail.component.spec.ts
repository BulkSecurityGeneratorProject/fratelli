/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FratelliTestModule } from '../../../test.module';
import { ColectivoDetailComponent } from '../../../../../../main/webapp/app/entities/colectivo/colectivo-detail.component';
import { ColectivoService } from '../../../../../../main/webapp/app/entities/colectivo/colectivo.service';
import { Colectivo } from '../../../../../../main/webapp/app/entities/colectivo/colectivo.model';

describe('Component Tests', () => {

    describe('Colectivo Management Detail Component', () => {
        let comp: ColectivoDetailComponent;
        let fixture: ComponentFixture<ColectivoDetailComponent>;
        let service: ColectivoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [ColectivoDetailComponent],
                providers: [
                    ColectivoService
                ]
            })
            .overrideTemplate(ColectivoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColectivoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColectivoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Colectivo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.colectivo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
