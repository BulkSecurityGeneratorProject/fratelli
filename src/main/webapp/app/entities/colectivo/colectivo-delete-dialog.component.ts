import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colectivo } from './colectivo.model';
import { ColectivoPopupService } from './colectivo-popup.service';
import { ColectivoService } from './colectivo.service';

@Component({
    selector: 'jhi-colectivo-delete-dialog',
    templateUrl: './colectivo-delete-dialog.component.html'
})
export class ColectivoDeleteDialogComponent {

    colectivo: Colectivo;

    constructor(
        private colectivoService: ColectivoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colectivoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'colectivoListModification',
                content: 'Deleted an colectivo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colectivo-delete-popup',
    template: ''
})
export class ColectivoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colectivoPopupService: ColectivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.colectivoPopupService
                .open(ColectivoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
