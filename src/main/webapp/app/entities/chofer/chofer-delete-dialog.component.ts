import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chofer } from './chofer.model';
import { ChoferPopupService } from './chofer-popup.service';
import { ChoferService } from './chofer.service';

@Component({
    selector: 'jhi-chofer-delete-dialog',
    templateUrl: './chofer-delete-dialog.component.html'
})
export class ChoferDeleteDialogComponent {

    chofer: Chofer;

    constructor(
        private choferService: ChoferService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.choferService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'choferListModification',
                content: 'Deleted an chofer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chofer-delete-popup',
    template: ''
})
export class ChoferDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private choferPopupService: ChoferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.choferPopupService
                .open(ChoferDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
