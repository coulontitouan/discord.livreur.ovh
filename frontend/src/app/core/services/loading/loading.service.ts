import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class LoadingService {
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    loadingOn() {
        this.isLoading.next(true);
    }

    loadingOff() {
        this.isLoading.next(false);
    }
}
