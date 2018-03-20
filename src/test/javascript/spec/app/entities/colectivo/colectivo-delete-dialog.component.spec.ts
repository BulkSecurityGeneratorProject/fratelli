/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FratelliTestModule } from '../../../test.module';
import { ColectivoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/colectivo/colectivo-delete-dialog.component';
import { ColectivoService } from '../../../../../../main/webapp/app/entities/colectivo/colectivo.service';

describe('Component Tests', () => {

    describe('Colectivo Management Delete Component', () => {
        let comp: ColectivoDeleteDialogComponent;
        let fixture: ComponentFixture<ColectivoDeleteDialogComponent>;
        let service: ColectivoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FratelliTestModule],
                declarations: [ColectivoDeleteDialogComponent],
                providers: [
                    ColectivoService
                ]
            })
            .overrideTemplate(ColectivoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColectivoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColectivoService);
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
