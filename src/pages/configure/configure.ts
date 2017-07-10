import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';

/**
 * Generated class for the ConfigurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-configure',
  templateUrl: 'configure.html',
})
export class ConfigurePage {
  title;
  todo;
  isComplete;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public alertCtrl: AlertController,
    public todoService: TodosProvider
  ) {  }

  ionViewDidLoad() {
    this.title = this.navParams.get('todo').title;
    this.todo = this.navParams.get('todo');
    this.isComplete = this.navParams.get('todo').isComplete;
  }

  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
    this.view.dismiss();
  }

  toggleComplete(todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.updateTodo(todo);
    this.view.dismiss();
  }

  editTodo(todo){

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
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
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title,
              isComplete: todo.isComplete
            });
            this.title = data.title;
            this.isComplete = todo.isComplete;
          }
        }
      ]
    });

    prompt.present();
  }

}
