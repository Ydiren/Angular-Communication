import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.filterElementRef){
      this.filterElementRef.nativeElement.focus();
    }
  }

  // Only triggered when an @Input property changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = `Hits: ${this.hitCount}`;
    }
  }
}
