/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FratelliTestModule } from '../../../test.module';
import { PresupuestoDialogComponent } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto-dialog.component';
import { PresupuestoService } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.service';
import { Presupuesto } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.model';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';
import { ChoferService } from '../../../../../../main/webapp/app/entities/chofer';
import { ColectivoService } from '../../../../../../main/webapp/app/entities/colectivo';

describe('Component Tests', () => {

    describe('Presupuesto Management Dialog Component', () => {
        let comp: PresupuestoDialogComponent;
        let fixture: ComponentFixture<PresupuestoDialogComponent>;
        let service: PresupuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [PresupuestoDialogComponent],
                providers: [
                    ClienteService,
                    ChoferService,
                    ColectivoService,
                    PresupuestoService
                ]
            })
            .overrideTemplate(PresupuestoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresupuestoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Presupuesto(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.presupuesto = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'presupuestoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Presupuesto();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.presupuesto = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'presupuestoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
