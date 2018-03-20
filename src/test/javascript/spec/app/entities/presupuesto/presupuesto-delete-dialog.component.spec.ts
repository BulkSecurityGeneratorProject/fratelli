/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FratelliTestModule } from '../../../test.module';
import { PresupuestoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto-delete-dialog.component';
import { PresupuestoService } from '../../../../../../main/webapp/app/entities/presupuesto/presupuesto.service';

describe('Component Tests', () => {

    describe('Presupuesto Management Delete Component', () => {
        let comp: PresupuestoDeleteDialogComponent;
        let fixture: ComponentFixture<PresupuestoDeleteDialogComponent>;
        let service: PresupuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [PresupuestoDeleteDialogComponent],
                providers: [
                    PresupuestoService
                ]
            })
            .overrideTemplate(PresupuestoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresupuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
