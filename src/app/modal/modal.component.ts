import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <carousel>
        <slide *ngFor="let item of images">
          <img [src]="item" [alt]="item" style="width:100%" />
        </slide>
      </carousel>
    </div>
  `,
})
export class ModalComponent {
  title: string;
  constructor(public bsModalRef: BsModalRef) {}
}
