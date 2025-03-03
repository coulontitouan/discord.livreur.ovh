import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ProfilData } from '../../../models/profil.model';

@Injectable({
    providedIn: 'root'
})
export class ProfilService {
    private readonly url: string = 'http://localhost:5000/api/user/401794358812344320';
    profil!: ProfilData;
    constructor(private readonly http: HttpClient) { }

    getProfil() {
        return this.http.get(this.url).pipe(
            tap((profil:any) => { 
                this.profil = new ProfilData(profil);
            })
        );
    }
}
