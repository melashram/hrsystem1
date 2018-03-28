import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TicketStatus } from './ticket-status.model';
import { TicketStatusPopupService } from './ticket-status-popup.service';
import { TicketStatusService } from './ticket-status.service';

@Component({
    selector: 'jhi-ticket-status-dialog',
    templateUrl: './ticket-status-dialog.component.html'
})
export class TicketStatusDialogComponent implements OnInit {

    ticketStatus: TicketStatus;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ticketStatusService: TicketStatusService,
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
        if (this.ticketStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ticketStatusService.update(this.ticketStatus));
        } else {
            this.subscribeToSaveResponse(
                this.ticketStatusService.create(this.ticketStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TicketStatus>>) {
        result.subscribe((res: HttpResponse<TicketStatus>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TicketStatus) {
        this.eventManager.broadcast({ name: 'ticketStatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ticket-status-popup',
    template: ''
})
export class TicketStatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ticketStatusPopupService: TicketStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ticketStatusPopupService
                    .open(TicketStatusDialogComponent as Component, params['id']);
            } else {
                this.ticketStatusPopupService
                    .open(TicketStatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
