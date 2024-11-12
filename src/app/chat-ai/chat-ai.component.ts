import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrls: ['./chat-ai.component.css']
})
export class ChatAiComponent implements OnInit {

  clicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggel() {
    if (this.clicked) {
      this.clicked = false;
    } else {
      this.clicked = true;
    }
  }

}
