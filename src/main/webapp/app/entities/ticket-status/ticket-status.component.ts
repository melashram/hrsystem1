import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TicketStatus } from './ticket-status.model';
import { TicketStatusService } from './ticket-status.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ticket-status',
    templateUrl: './ticket-status.component.html'
})
export class TicketStatusComponent implements OnInit, OnDestroy {
ticketStatuses: TicketStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ticketStatusService: TicketStatusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ticketStatusService.query().subscribe(
            (res: HttpResponse<TicketStatus[]>) => {
                this.ticketStatuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTicketStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TicketStatus) {
        return item.id;
    }
    registerChangeInTicketStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('ticketStatusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
