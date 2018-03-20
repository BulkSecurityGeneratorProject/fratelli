/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FratelliTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
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
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ColectivoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ColectivoDetailComponent, '')
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

            spyOn(service, 'find').and.returnValue(Observable.of(new Colectivo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.colectivo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
