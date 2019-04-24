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
export class ServerDetailComponent {
  @Input() name: string;

  constructor() {
    console.log('constructor called!');
  }

  xngOnChanges(changes: SimpleChanges) {
    console.log(this.name, '=> ngOnChanges called!');
    console.log('  ngOnChanges()', this.name, '=>', changes);
  }

  xngOnInit() {
    console.log(this.name, '=> ngOnInit called!');
  }

  xngDoCheck() {
    console.log(this.name, '=> ngDoCheck called!');
  }

  xngAfterContentInit() {
    console.log(this.name, '=> ngAfterContentInit called!');
  }

  xngAfterContentChecked() {
    console.log(this.name, '=> ngAfterContentChecked called!');
  }

  xngAfterViewInit() {
    console.log(this.name, '=> ngAfterViewInit called!');
  }

  xngAfterViewChecked() {
    console.log(this.name, '=> ngAfterViewChecked called!');
  }

  xngOnDestroy() {
    console.log(this.name, '=> ngOnDestroy called!');
  }
}
