import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  user: any;

  constructor(private dataService: DataService) { }


  togglePanel(panel: string) {
    const container = document.getElementById('container');
    if (panel === 'signUp') {
      container?.classList.add('right-panel-active');
    } else {
      container?.classList.remove('right-panel-active');
    }
  }

  async onSubmit() {
    try {
      this.user = await this.dataService.signInWithEmailAndPassword(this.email, this.password);
      console.log("user", this.user);
      // Aquí puedes manejar lo que sucede después de que el usuario inicia sesión
    } catch (error: any) {
      this.errorMessage = error.message;
      console.log("error", error)
    }
  }

  async onRegister() {
    try {
      await this.dataService.createUserWithEmailAndPassword(this.email, this.password);
    }catch (error: any) {
      this.errorMessage = error.message;
      console.log('error', error)
    }
  }

  async onSignInWithGoogle() {
    try {
      await this.dataService.signInWithGoogle();
    } catch(error: any) {
      this.errorMessage = error.message;
      console.log('error', error)
    }
  }

}
