import { Component } from '@angular/core'; // crear el componente.
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service'; // Servicio de autenticación
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Módulos para el enrutamiento
import { Router } from '@angular/router'; // Router para la navegación


// Interfaz inicio de sesión
interface LoginResponse {
  access: string;
  refresh: string;
}


// Componente de Angular
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive], // Módulos importados
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export default class LoginComponent {
  // Variables para el inicio de sesión
  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';


  // constructor (AuthService para la autenticación y Router para redireccionamiento.)
  constructor(private authService: AuthService, private router: Router) { }


  // Método que se ejecuta cuando se envía el formulario del login.
  onSubmit() {
    // Creamos un objeto con los datos del formulario
    const loginData = {
      username: this.username,
      password: this.password,
    };



    // Se llama al método post del AuthService para hacer la petición de autenticación.
    this.authService.post('/app-land/api/token/', loginData)
      .then((response: any) => {
        // Si la autenticación es exitosa, se almacenan los tokens en el localStorage.
        localStorage.setItem('accessToken', response.data.access);
        //console.log(response)
        localStorage.setItem('refreshToken', response.data.refresh);
        // Se redirige al usuario al dashboard.
        this.router.navigate(['/dashboard']);
      })
      .catch((error: HttpErrorResponse) => {
        // Si ocurre un error, se manejan los diferentes estados de error.
        if (error.status === 400) {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        } else {
          this.errorMessage = 'Error al intentar iniciar sesión. Inténtalo más tarde.';
        }
      });
  }
}
