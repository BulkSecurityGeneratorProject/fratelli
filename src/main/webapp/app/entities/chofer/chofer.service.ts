import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Chofer } from './chofer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Chofer>;

@Injectable()
export class ChoferService {

    private resourceUrl =  SERVER_API_URL + 'api/chofers';

    constructor(private http: HttpClient) { }

    create(chofer: Chofer): Observable<EntityResponseType> {
        const copy = this.convert(chofer);
        return this.http.post<Chofer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chofer: Chofer): Observable<EntityResponseType> {
        const copy = this.convert(chofer);
        return this.http.put<Chofer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Chofer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Chofer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Chofer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Chofer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Chofer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Chofer[]>): HttpResponse<Chofer[]> {
        const jsonResponse: Chofer[] = res.body;
        const body: Chofer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chofer.
     */
    private convertItemFromServer(chofer: Chofer): Chofer {
        const copy: Chofer = Object.assign({}, chofer);
        return copy;
    }

    /**
     * Convert a Chofer to a JSON which can be sent to the server.
     */
    private convert(chofer: Chofer): Chofer {
        const copy: Chofer = Object.assign({}, chofer);
        return copy;
    }
}
