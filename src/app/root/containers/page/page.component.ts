import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersInfo } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { Position } from '../../../models/positions';
import { LocalStorageService } from '../../services/local-storage.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public menuItem = [
    {id: '', name: 'About me'},
    {id: 'banner', name: 'Relationships'},
    {id: 'requirement', name: 'Requirements'},
    {id: 'users', name: 'Users'},
    {id: 'login', name: 'Sign Up'}
  ];
  public activeItemMenu = '';
  public toggleMenu = false;
  public isDisabled = false;
  public isLogin = false;
  public userGlobalInfo: UsersInfo[] = [];
  public positionsInfo: Position[] = [];
  public page = 1;
  public errorMessage = '';
  public selectedFile: File = null;
  public togglePopup = false;
  public fileName = 'Upload your photo';
  public registerForm: FormGroup;

  constructor(private authService: AuthService,
              public localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    this.getInitUser();
    this.authService.getToken().subscribe( authData => {
      this.localStorageService.set('token', authData.token);
    });

    this.authService.getPositions().subscribe( position => {
      this.positionsInfo = position.positions;
    });

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      position: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required])
    });
  }

  public getInitUser(): void {
    this.page = 1;
    this.authService.getUser(this.page).subscribe( user => {
      this.userGlobalInfo  = user.users.sort();
    });
  }

  public getUsers(): void {
    this.page += 1;
    this.authService.getUser(this.page).subscribe( user => {
      if (user.users.length < 6) {
        this.isDisabled = true;
      }
      this.userGlobalInfo.push(...user.users.sort());
    });
  }

  public fileNameInput(event): void {
    this.selectedFile = event.target.files[0] as File;
    this.fileName = this.selectedFile.name;
  }

  public secondaryColor(e): void {
    this.activeItemMenu = e.srcElement.innerText;
    if (e.path[1].className === 'menu-links_box') {
      this.changeStateMenu();
    }
  }

  public changeStateMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }

  public closePopup(): void {
    this.togglePopup = false;
  }

  public register(): void {
    const registerData = this.registerForm.getRawValue();
    registerData.phone = '+' + registerData.phone;
    registerData.position = +registerData.position;
    registerData.file = this.selectedFile;
    this.authService.registerUser(registerData).pipe(
      finalize(() => this.registerForm.enable())
    ).subscribe( user => {
      this.getInitUser();
      this.registerForm.disable();
      this.isLogin = true;
      this.isDisabled = false;
      this.togglePopup = true;
    }, error => {
      if (error.status === 409 || error.status === 422) {
        this.errorMessage = error.error.message;
      }
    });
  }

}
