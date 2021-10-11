import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabListComponent implements OnInit, OnDestroy {
  @Input() headers!: string[];
  @Input() counter!: Observable<any>;
  public count!: number;
  private countSubscription!: Subscription;
  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
  }

  public refreshCounter() {
    this.cd.reattach();
  }

  test() {
    // this.cd.detectChanges();
    console.log('click tab');
  }

  ngOnInit(): void {
    this.countSubscription = this.counter.subscribe(
      (data) => {
        this.count = data.nombre;
      }
    )
  }
  ngOnDestroy() {
    this.countSubscription.unsubscribe();
  }
}
