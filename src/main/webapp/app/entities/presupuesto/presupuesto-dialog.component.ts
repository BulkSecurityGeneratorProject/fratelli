import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { PresupuestoPopupService } from './presupuesto-popup.service';
import { PresupuestoService } from './presupuesto.service';
import { Cliente, ClienteService } from '../cliente';
import { Chofer, ChoferService } from '../chofer';
import { Colectivo, ColectivoService } from '../colectivo';

@Component({
    selector: 'jhi-presupuesto-dialog',
    templateUrl: './presupuesto-dialog.component.html'
})
export class PresupuestoDialogComponent implements OnInit {

    presupuesto: Presupuesto;
    isSaving: boolean;

    clientes: Cliente[];

    chofers: Chofer[];

    colectivos: Colectivo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private presupuestoService: PresupuestoService,
        private clienteService: ClienteService,
        private choferService: ChoferService,
        private colectivoService: ColectivoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.choferService.query()
            .subscribe((res: HttpResponse<Chofer[]>) => { this.chofers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.colectivoService.query()
            .subscribe((res: HttpResponse<Colectivo[]>) => { this.colectivos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.presupuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.presupuestoService.update(this.presupuesto));
        } else {
            this.subscribeToSaveResponse(
                this.presupuestoService.create(this.presupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Presupuesto>>) {
        result.subscribe((res: HttpResponse<Presupuesto>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Presupuesto) {
        this.eventManager.broadcast({ name: 'presupuestoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackChoferById(index: number, item: Chofer) {
        return item.id;
    }

    trackColectivoById(index: number, item: Colectivo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-presupuesto-popup',
    template: ''
})
export class PresupuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private presupuestoPopupService: PresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.presupuestoPopupService
                    .open(PresupuestoDialogComponent as Component, params['id']);
            } else {
                this.presupuestoPopupService
                    .open(PresupuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
