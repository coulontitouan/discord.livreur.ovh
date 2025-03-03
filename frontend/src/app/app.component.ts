import { Component, OnInit } from '@angular/core';
import { ProfilService } from './core/services/profil/profil.service';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ProfilData } from './models/profil.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [LoadingIndicatorComponent],
    providers: [ProfilService]
})
export class AppComponent implements OnInit {
    profil!: ProfilData;
    title = 'frontend';
    name = 'John Doe';
    banner: { color: string, url: string | null; } = { color: '#000000', url: null };

    constructor(public profilService: ProfilService) { }

    ngOnInit() {
        this.profilService.getProfil().subscribe((profil: ProfilData) => {
            this.profil = this.profilService.profil;
            this.name = this.profil.username;
            this.profil.getBanner().then((banner) => { console.log(banner);this.banner = banner; });
        });
    }
}