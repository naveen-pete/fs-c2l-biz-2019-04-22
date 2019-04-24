import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {
  @Output()
  serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @ViewChild('serverName') serverNameInput: ElementRef;
  @ViewChild('serverContent') serverContentInput: ElementRef;

  constructor() {}

  ngOnInit() {}

  onAddServer() {
    this.serverCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
