import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/loading/loading.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: "loading-indicator",
    templateUrl: "./loading-indicator.component.html",
    styleUrls: ["./loading-indicator.component.scss"],
    imports: [MatProgressSpinnerModule, AsyncPipe, NgIf],
    standalone: true,
})
export class LoadingIndicatorComponent /* implements OnInit*/ {

    loading: Observable<boolean>;

    constructor(public loader: LoadingService) {
        this.loading = loader.isLoading;
    }
}
