import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HumanResourceUser } from './human-resource-user.model';
import { HumanResourceUserPopupService } from './human-resource-user-popup.service';
import { HumanResourceUserService } from './human-resource-user.service';

@Component({
    selector: 'jhi-human-resource-user-delete-dialog',
    templateUrl: './human-resource-user-delete-dialog.component.html'
})
export class HumanResourceUserDeleteDialogComponent {

    humanResourceUser: HumanResourceUser;

    constructor(
        private humanResourceUserService: HumanResourceUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.humanResourceUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'humanResourceUserListModification',
                content: 'Deleted an humanResourceUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-human-resource-user-delete-popup',
    template: ''
})
export class HumanResourceUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private humanResourceUserPopupService: HumanResourceUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.humanResourceUserPopupService
                .open(HumanResourceUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
