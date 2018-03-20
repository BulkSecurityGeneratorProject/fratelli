/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FratelliTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
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
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ChoferService,
                    JhiEventManager
                ]
            }).overrideTemplate(ChoferDetailComponent, '')
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

            spyOn(service, 'find').and.returnValue(Observable.of(new Chofer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chofer).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
