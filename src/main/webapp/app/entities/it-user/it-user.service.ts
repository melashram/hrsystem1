import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ItUser } from './it-user.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ItUser>;

@Injectable()
export class ItUserService {

    private resourceUrl =  SERVER_API_URL + 'api/it-users';

    constructor(private http: HttpClient) { }

    create(itUser: ItUser): Observable<EntityResponseType> {
        const copy = this.convert(itUser);
        return this.http.post<ItUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(itUser: ItUser): Observable<EntityResponseType> {
        const copy = this.convert(itUser);
        return this.http.put<ItUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ItUser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ItUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<ItUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ItUser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ItUser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ItUser[]>): HttpResponse<ItUser[]> {
        const jsonResponse: ItUser[] = res.body;
        const body: ItUser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ItUser.
     */
    private convertItemFromServer(itUser: ItUser): ItUser {
        const copy: ItUser = Object.assign({}, itUser);
        return copy;
    }

    /**
     * Convert a ItUser to a JSON which can be sent to the server.
     */
    private convert(itUser: ItUser): ItUser {
        const copy: ItUser = Object.assign({}, itUser);
        return copy;
    }
}
