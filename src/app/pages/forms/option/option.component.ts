import { Component, Input } from "@angular/core";
import { BaseAnswer } from "src/app/models/base-answer.model";

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss']
  })

  export class OptionComponent {
    @Input()
    currentOption: BaseAnswer;

    constructor() { }
  }