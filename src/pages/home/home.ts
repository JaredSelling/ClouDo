import { Component } from "@angular/core";
import { NavController, AlertController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';
import { ConfigurePage } from '../configure/configure';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  isComplete: boolean;

  constructor(
    public navCtrl: NavController,
    public todoService: TodosProvider,
    public alertCtrl: AlertController
   ) { }

  ionViewDidLoad(){
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
  }

  viewTodo(todo) {
    this.navCtrl.push(ConfigurePage, {
      todo: todo
    });
  }


  createTodo(){

    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title, isComplete: false});
          }
        }
      ]
    });

    prompt.present();

  }





}
