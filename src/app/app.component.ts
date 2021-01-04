import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedImage: any = null;
  imgSrc: any;
  constructor(private  storage: AngularFireStorage) {
  }

ngonInit(){}

showPreview(event: any) {
  if(event.target.files && event.target.files[0]){
    const  reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
    this.submit();
  }else {
  this.imgSrc = '../../../asset/img/Placholder.jpg';
  this.selectedImage = null}
}

  private submit() {
    if(this.selectedImage != null){
      const filePath = `avatar/${this.selectedImage.new.split('.').slice(0, -1).join('.')}..${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        // fileRef.getDownloadURL().subscribe( url =>{
        //   this.imgSrc = url;
        // })
      ).subscribe();
    }
  }
}




