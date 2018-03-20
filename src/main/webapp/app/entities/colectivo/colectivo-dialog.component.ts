import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colectivo } from './colectivo.model';
import { ColectivoPopupService } from './colectivo-popup.service';
import { ColectivoService } from './colectivo.service';

@Component({
    selector: 'jhi-colectivo-dialog',
    templateUrl: './colectivo-dialog.component.html'
})
export class ColectivoDialogComponent implements OnInit {

    colectivo: Colectivo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private colectivoService: ColectivoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.colectivo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.colectivoService.update(this.colectivo));
        } else {
            this.subscribeToSaveResponse(
                this.colectivoService.create(this.colectivo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Colectivo>>) {
        result.subscribe((res: HttpResponse<Colectivo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Colectivo) {
        this.eventManager.broadcast({ name: 'colectivoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-colectivo-popup',
    template: ''
})
export class ColectivoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colectivoPopupService: ColectivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.colectivoPopupService
                    .open(ColectivoDialogComponent as Component, params['id']);
            } else {
                this.colectivoPopupService
                    .open(ColectivoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
