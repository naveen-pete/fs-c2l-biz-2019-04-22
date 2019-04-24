import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements
    OnChanges, OnInit, DoCheck, AfterContentInit,
    AfterContentChecked, AfterViewInit, AfterViewChecked,
    OnDestroy {
  @Input() name: string;

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.name, '=> ngOnChanges called!');
    console.log('  ngOnChanges()', this.name, '=>', changes);
  }

  ngOnInit() {
    console.log(this.name, '=> ngOnInit called!');
  }

  ngDoCheck() {
    console.log(this.name, '=> ngDoCheck called!');
  }

  ngAfterContentInit() {
    console.log(this.name, '=> ngAfterContentInit called!');
  }

  ngAfterContentChecked() {
    console.log(this.name, '=> ngAfterContentChecked called!');
  }

  ngAfterViewInit() {
    console.log(this.name, '=> ngAfterViewInit called!');
  }

  ngAfterViewChecked() {
    console.log(this.name, '=> ngAfterViewChecked called!');
  }

  ngOnDestroy() {
    console.log(this.name, '=> ngOnDestroy called!');
  }
}
