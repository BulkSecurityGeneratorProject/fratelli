/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FratelliTestModule } from '../../../test.module';
import { ColectivoComponent } from '../../../../../../main/webapp/app/entities/colectivo/colectivo.component';
import { ColectivoService } from '../../../../../../main/webapp/app/entities/colectivo/colectivo.service';
import { Colectivo } from '../../../../../../main/webapp/app/entities/colectivo/colectivo.model';

describe('Component Tests', () => {

    describe('Colectivo Management Component', () => {
        let comp: ColectivoComponent;
        let fixture: ComponentFixture<ColectivoComponent>;
        let service: ColectivoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [ColectivoComponent],
                providers: [
                    ColectivoService
                ]
            })
            .overrideTemplate(ColectivoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColectivoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColectivoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Colectivo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.colectivos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
