/* eslint-disable @typescript-eslint/naming-convention */
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthserviceService } from '../services/fireauthservice.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FireserviceService } from '../services/fireservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage = '';
  validation_messages = {
  email: [
  { type: 'required', message: 'Email is required.' },
  { type: 'pattern', message: 'Please enter a valid email.' }
  ],
  password: [
  { type: 'required', message: 'Password is required.' },
  { type: 'minlength', message: 'Password must be at least 5 characters long.' }
  ]
  };

  constructor(
    private authService: FireauthserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    public fser: FireserviceService,
    public modalCtrl: ModalController
    ) { }


 ngOnInit() {
 this.validations_form = this.formBuilder.group({
 email: new FormControl('', Validators.compose([
 Validators.required,
 Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
 ])),
 password: new FormControl('', Validators.compose([
 Validators.minLength(5),
 Validators.required
 ])),
 });
 }
 tryLogin(value){
 this.authService.doLogin(value)
 .then(res => {
  this.fser.saveUserLocal();
  const token=localStorage.getItem('token');
console.log('token: '+token);
  this.fser.updateUserToken(token);
 this.router.navigate(['/home']);
 }, err => {
 this.errorMessage = err.message;
 console.log(err);
 });
 }
 goRegisterPage(){
 this.router.navigate(['/register']);
 }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
