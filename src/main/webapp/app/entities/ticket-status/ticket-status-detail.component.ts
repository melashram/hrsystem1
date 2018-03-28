import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TicketStatus } from './ticket-status.model';
import { TicketStatusService } from './ticket-status.service';

@Component({
    selector: 'jhi-ticket-status-detail',
    templateUrl: './ticket-status-detail.component.html'
})
export class TicketStatusDetailComponent implements OnInit, OnDestroy {

    ticketStatus: TicketStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ticketStatusService: TicketStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTicketStatuses();
    }

    load(id) {
        this.ticketStatusService.find(id)
            .subscribe((ticketStatusResponse: HttpResponse<TicketStatus>) => {
                this.ticketStatus = ticketStatusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTicketStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ticketStatusListModification',
            (response) => this.load(this.ticketStatus.id)
        );
    }
}
