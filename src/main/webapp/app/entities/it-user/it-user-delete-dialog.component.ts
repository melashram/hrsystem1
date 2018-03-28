import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ItUser } from './it-user.model';
import { ItUserPopupService } from './it-user-popup.service';
import { ItUserService } from './it-user.service';

@Component({
    selector: 'jhi-it-user-delete-dialog',
    templateUrl: './it-user-delete-dialog.component.html'
})
export class ItUserDeleteDialogComponent {

    itUser: ItUser;

    constructor(
        private itUserService: ItUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.itUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'itUserListModification',
                content: 'Deleted an itUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-it-user-delete-popup',
    template: ''
})
export class ItUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itUserPopupService: ItUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.itUserPopupService
                .open(ItUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
