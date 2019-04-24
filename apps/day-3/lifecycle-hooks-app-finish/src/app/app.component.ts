import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [];

  onServerCreated(serverData: { serverName: string; serverContent: string }) {
    this.servers.unshift({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onChangeFirst() {
    const { name } = this.servers[0];
    this.servers[0].name = `${name} - changed`;
  }

  onDestroyFirst() {
    this.servers.splice(0, 1);
  }
}
