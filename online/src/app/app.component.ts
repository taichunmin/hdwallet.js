import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { info } from '@hdwallet/core';

import { TerminalService } from './services/terminal/terminal.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  constructor(
    private terminalService: TerminalService,
    private storageService: StorageService
  ) {
    this.getInfo();
  }

  ngOnInit(): void {
    if (!this.storageService.getStorage('disclaimer')) {
      this.storageService.setStorage('disclaimer', false);
    }
  }

  getInfo(): void {

    this.storageService.setJSONStorage('info', {
      version: info.__version__,
      source: info.__source__,
      author: info.__author__,
      email: info.__email__
    });
    this.terminalService.update(null, null, false);
  }
}
