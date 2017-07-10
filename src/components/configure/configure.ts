import { Component } from '@angular/core';

/**
 * Generated class for the ConfigureComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'configure',
  templateUrl: 'configure.html'
})
export class ConfigureComponent {

  text: string;

  constructor() {
    console.log('Hello ConfigureComponent Component');
    this.text = 'Hello World';
  }

}
