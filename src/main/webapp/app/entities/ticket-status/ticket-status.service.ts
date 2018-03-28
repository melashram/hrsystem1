import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TicketStatus } from './ticket-status.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TicketStatus>;

@Injectable()
export class TicketStatusService {

    private resourceUrl =  SERVER_API_URL + 'api/ticket-statuses';

    constructor(private http: HttpClient) { }

    create(ticketStatus: TicketStatus): Observable<EntityResponseType> {
        const copy = this.convert(ticketStatus);
        return this.http.post<TicketStatus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ticketStatus: TicketStatus): Observable<EntityResponseType> {
        const copy = this.convert(ticketStatus);
        return this.http.put<TicketStatus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TicketStatus>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TicketStatus[]>> {
        const options = createRequestOption(req);
        return this.http.get<TicketStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TicketStatus[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TicketStatus = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TicketStatus[]>): HttpResponse<TicketStatus[]> {
        const jsonResponse: TicketStatus[] = res.body;
        const body: TicketStatus[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TicketStatus.
     */
    private convertItemFromServer(ticketStatus: TicketStatus): TicketStatus {
        const copy: TicketStatus = Object.assign({}, ticketStatus);
        return copy;
    }

    /**
     * Convert a TicketStatus to a JSON which can be sent to the server.
     */
    private convert(ticketStatus: TicketStatus): TicketStatus {
        const copy: TicketStatus = Object.assign({}, ticketStatus);
        return copy;
    }
}
