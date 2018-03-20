/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FratelliTestModule } from '../../../test.module';
import { PresupuestoDetailComponent } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto-detail.component';
import { PresupuestoService } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.service';
import { Presupuesto } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.model';

describe('Component Tests', () => {

    describe('Presupuesto Management Detail Component', () => {
        let comp: PresupuestoDetailComponent;
        let fixture: ComponentFixture<PresupuestoDetailComponent>;
        let service: PresupuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [PresupuestoDetailComponent],
                providers: [
                    PresupuestoService
                ]
            })
            .overrideTemplate(PresupuestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresupuestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Presupuesto(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.presupuesto).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
