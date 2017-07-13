import { Component } from "@angular/core";
import { NavController, AlertController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';
import { ConfigurePage } from '../configure/configure';
import { LoginPage } from '../login/login';
import { reorderArray } from 'ionic-angular';

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
      console.log(JSON.stringify(data));
      this.todos = data;

    /*  console.log('todos length: '+this.todos.length);
      for(let i = 0; i< this.todos.length; i++) {
        console.log(this.todos[i].title+ " : " + i);
      } */
    }).catch((err) => {
      console.log('ERR: '+err);
    });
  }

  reorderItems(indexes) {
    let element = this.todos[indexes.from];
    this.todos.splice(indexes.from, 1);
    this.todos.splice(indexes.to, 0, element);
  }

  logout() {
    this.todoService.logout();
    this.todos = null;
    this.navCtrl.setRoot(LoginPage);
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
