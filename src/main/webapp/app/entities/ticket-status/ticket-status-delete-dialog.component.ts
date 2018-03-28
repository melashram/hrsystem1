import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TicketStatus } from './ticket-status.model';
import { TicketStatusPopupService } from './ticket-status-popup.service';
import { TicketStatusService } from './ticket-status.service';

@Component({
    selector: 'jhi-ticket-status-delete-dialog',
    templateUrl: './ticket-status-delete-dialog.component.html'
})
export class TicketStatusDeleteDialogComponent {

    ticketStatus: TicketStatus;

    constructor(
        private ticketStatusService: TicketStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ticketStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ticketStatusListModification',
                content: 'Deleted an ticketStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ticket-status-delete-popup',
    template: ''
})
export class TicketStatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ticketStatusPopupService: TicketStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ticketStatusPopupService
                .open(TicketStatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
