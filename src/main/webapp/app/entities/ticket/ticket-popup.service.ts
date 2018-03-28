import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';

@Injectable()
export class TicketPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ticketService: TicketService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.ticketService.find(id)
                    .subscribe((ticketResponse: HttpResponse<Ticket>) => {
                        const ticket: Ticket = ticketResponse.body;
                        if (ticket.creationdate) {
                            ticket.creationdate = {
                                year: ticket.creationdate.getFullYear(),
                                month: ticket.creationdate.getMonth() + 1,
                                day: ticket.creationdate.getDate()
                            };
                        }
                        if (ticket.acceptanceDate) {
                            ticket.acceptanceDate = {
                                year: ticket.acceptanceDate.getFullYear(),
                                month: ticket.acceptanceDate.getMonth() + 1,
                                day: ticket.acceptanceDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.ticketModalRef(component, ticket);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ticketModalRef(component, new Ticket());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ticketModalRef(component: Component, ticket: Ticket): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ticket = ticket;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
