/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FratelliTestModule } from '../../../test.module';
import { PresupuestoComponent } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.component';
import { PresupuestoService } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.service';
import { Presupuesto } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.model';

describe('Component Tests', () => {

    describe('Presupuesto Management Component', () => {
        let comp: PresupuestoComponent;
        let fixture: ComponentFixture<PresupuestoComponent>;
        let service: PresupuestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [PresupuestoComponent],
                providers: [
                    PresupuestoService
                ]
            })
            .overrideTemplate(PresupuestoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresupuestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Presupuesto(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.presupuestos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
