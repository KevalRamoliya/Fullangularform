import { Component } from '@angular/core';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent {
  selectedFile: File | null = null;
  fileError: boolean = false;

  onFileSelected(event: any): void {
    this.fileError = false;

    const files: FileList = event.target.files;
    console.log(files);


    if (files.length > 0) {
      const file: File = files[0];

      // Check if the selected file is a PDF
      if (file.type === 'application/png' || file.name.endsWith('.png')) {
        this.selectedFile = file;
      } else {
        this.fileError = true;
        this.selectedFile = null;
      }
    }
  }
}
