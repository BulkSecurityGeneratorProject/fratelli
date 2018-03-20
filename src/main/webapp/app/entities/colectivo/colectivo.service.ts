import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Colectivo } from './colectivo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Colectivo>;

@Injectable()
export class ColectivoService {

    private resourceUrl =  SERVER_API_URL + 'api/colectivos';

    constructor(private http: HttpClient) { }

    create(colectivo: Colectivo): Observable<EntityResponseType> {
        const copy = this.convert(colectivo);
        return this.http.post<Colectivo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(colectivo: Colectivo): Observable<EntityResponseType> {
        const copy = this.convert(colectivo);
        return this.http.put<Colectivo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Colectivo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Colectivo[]>> {
        const options = createRequestOption(req);
        return this.http.get<Colectivo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Colectivo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Colectivo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Colectivo[]>): HttpResponse<Colectivo[]> {
        const jsonResponse: Colectivo[] = res.body;
        const body: Colectivo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Colectivo.
     */
    private convertItemFromServer(colectivo: Colectivo): Colectivo {
        const copy: Colectivo = Object.assign({}, colectivo);
        return copy;
    }

    /**
     * Convert a Colectivo to a JSON which can be sent to the server.
     */
    private convert(colectivo: Colectivo): Colectivo {
        const copy: Colectivo = Object.assign({}, colectivo);
        return copy;
    }
}
