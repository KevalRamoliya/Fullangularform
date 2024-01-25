import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { AuthservicesService } from '../services/authservices.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent {
  title = 'gymform';
  public user: any;
  private id: any;
  edituser: boolean = true;
  public isDisabled: boolean = false;
  public deleteButtonDisabled: boolean = false;
  public isAscendingOrder: boolean = false
  searchTerm: any = "";
  selectedField: string = '';
  first: number = 0;
  rows: number = 20;
  totalRecords: number = 0;
  errorMessage: string = '';
  searchFile: string = "";
  selectedFileType: string = "";
  defaultname: string = "";



  constructor(private userdata: UserService, private spinner: NgxSpinnerService, private authservice: AuthservicesService,private route:Router) { }

  // File select validation:-
  // validationFile(fileInput: any) {
  //   const fileList = fileInput?.files;
  //   const fileName = fileList?.length > 0 ? fileList[0].name : '';
  //   const fileExtension = this.getFileExtension(fileName);

  //   console.log('Selected File Type:', this.selectedFileType);
  //   console.log('Selected File Extension:', fileExtension);

  //   let errorMessage: string = "";

  //   if (!fileList || fileList.length === 0) {
  //     errorMessage = 'Error: Please select a file';
  //   } else if (this.selectedFileType === 'JPG' && fileExtension !== '.jpg') {
  //     errorMessage = 'Error: Selected file type does not match file extension JPG';
  //   } else if (this.selectedFileType === 'PDF' && fileExtension !== '.pdf') {
  //     errorMessage = 'Error: Selected file type does not match file extension PDF';
  //   } else if (this.selectedFileType === 'PNG' && fileExtension !== '.png') {
  //     errorMessage = 'Error: Selected file type does not match file extension PNG';
  //   } else {
  //     this.selectedFileType = this.getFileExtension(fileExtension);
  //   }

  //   if (errorMessage) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: errorMessage,
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Done',
  //       text: 'File successfully processed!',
  //     });
  //   }
  // }
  // getFileExtension(fileName: string): string {
  //   this.defaultname = fileName;
  //   console.log("defailt name ", this.defaultname);

  //   const dotIndex = fileName.lastIndexOf('.');
  //   if (dotIndex !== -1) {
  //     return fileName.slice(dotIndex);
  //   }
  //   return '';
  // }

  validationFile(fileInput: any) {
    const fileList: FileList | null = fileInput.files;

    if (fileList) {
      const fileName: string = fileList[0].name;
      const fileExtension: string = this.getFileExtension(fileName).toLowerCase();

      console.log('Selected File Type:', this.selectedFileType);
      console.log('Selected File Extension:', fileExtension);

      if (!this.isValidFileType()) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error: Selected file type does not match file extension',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'File successfully processed!',
        });
      }
    }
  }

  isValidFileType(): boolean {
    if (this.selectedFileType && this.searchFile) {
      const fileExtension = this.getFileExtension(this.searchFile).toLowerCase();
      const expectedExtension = `.${this.selectedFileType.toLowerCase()}`;
      return fileExtension === expectedExtension;
    }
    return false;
  }

  getFileExtension(fileName: string): string {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex !== -1) {
      return fileName.slice(dotIndex);
    }
    return '';
  }


  // pagination
  onPageChange(event: any) {
    this.first = event.first;
  }

  toggleEnableDisable(id: any) {
    const index = this.user.findIndex((data: any) => data.id === id);
    if (index !== -1) {
      this.user[index].deleteButtonDisabled = !this.user[index].deleteButtonDisabled;
    }
  }

  sortList(order: 'asc' | 'desc'): void {
    this.isAscendingOrder = order === 'asc'; // Update the order flag

    this.user.sort((a: any, b: any) => {
      const nameA = a.name.toString().toUpperCase();
      const nameB = b.name.toString().toUpperCase();

      if (this.isAscendingOrder) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }




  loadData() {
    this.userdata.getdata().subscribe((data: any) => {
      this.user = data;
      this.totalRecords = data.length;
    });
  }


  loginform = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, this.emailValidator]),
    pnumber: new FormControl("", [Validators.required, this.phoneNumberValidator, Validators.maxLength(10)]),
    age: new FormControl("", [Validators.required, Validators.maxLength(2)]),
    bheight: new FormControl("", [Validators.required]),
    bweight: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    fileType: new FormControl("", [Validators.required]),
    termsAndConditions: new FormControl(false, Validators.requiredTrue),
  })

  get name() {
    return this.loginform.get('name')
  }
  get email() {
    return this.loginform.get('email')
  }
  get pnumber() {
    return this.loginform.get('pnumber')
  }
  get age() {
    return this.loginform.get('age')
  }
  get bheight() {
    return this.loginform.get('bheight')
  }
  get bweight() {
    return this.loginform.get('bweight')
  }
  get gender() {
    return this.loginform.get('gender')
  }
  get address() {
    return this.loginform.get('address')
  }

  //email validation :-
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (control.value && !emailRegex.test(control.value)) {
      return { 'invalidEmail': true };
    }

    // Check if the email ends with ".com"
    if (control.value && !control.value.endsWith('.com')) {
      return { 'invalidDomain': true };
    }

    return null;
  }

  //Phone number constion :-
  phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumberRegex = /^\d{10}$/;

    if (control.value && !phoneNumberRegex.test(control.value)) {
      return { 'invalidPhoneNumber': true };
    }

    return null;
  }

  handlePhoneNumberInput(event: any) {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/\D/g, '');

    const truncatedValue = numericValue.substring(0, 10);

    this.loginform.get('pnumber')?.setValue(truncatedValue);
  }

  //keypress function use :-
  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }


  ngOnInit(): void {
    this.getuserdata();
    this.loadData();
  }


  getuserdata() {
    this.userdata.getdata().subscribe((res) => {
      this.user = res;
    });
  }

  postuserdata(formData: any) {

    const duplicctae = this.user.find((user: any) =>
      user.email === formData.email ||
      user.name === formData.name ||
      user.pnumber === formData.pnumber)

    if (duplicctae) {
      Swal.fire(
        'Dublictaed!',
        'Your imaginary file .',
        'success'
      )
    } else {
      if (this.loginform.valid) {
        // const randomId = Math.floor(Math.random() * 10).toString();

        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);

        this.userdata.postdata({ ...formData }).subscribe(
          (res) => {
            console.log("Post data", res);
            this.getuserdata();
            this.loginform.reset();
          },
          (error) => {
            console.error("Post data error", error);
          }
        );
      } else {
        console.error("Form is not valid");
      }
    }

  }

  removedata(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
        }, 1000);

        this.userdata.deleteData(id).subscribe(() => {
          this.getuserdata();
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          );
        }, (error) => {
          console.error("Delete error", error);
        });
      } else {
        // User canceled deletion
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'info'
        );
      }
    });
  }

  //remove all data
  removeall() {
    this.user.forEach((element: any) => {
      const id = element.id;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletealldata(id);
          this.route.navigate(['crud/fpage'])
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    });
  }

  deletealldata(id: string | number) {
    this.userdata.deletealldata(id).subscribe(
      (res) => {
        console.log(`Data with ID ${id} removed successfully`, res);
      },
      (error) => {
        console.error(`Error removing data with ID ${id}`, error);
      }
    );
  }


  onButtonClicked(formData: any) {
    if (this.edituser) {
      this.postuserdata(formData);
    } else {
      this.save(formData);
    }
  }

  editdata(data: any) {
    console.log(data);
    this.loginform.patchValue(data);
    this.id = data.id;
    this.edituser = false;
  }

  save(formData: any) {
    if (this.loginform.valid) {
      this.userdata.editdata(formData, this.id).subscribe(
        (res) => {
          console.log("edit data", res);
          this.getuserdata();
          this.loginform.reset();
          this.edituser = true;
        },
        (error) => {
          console.error("Edit data error", error);
        }
      );
    } else {
      console.error("Form is not valid");
    }
  }

  viewdata(data: any) {
    Swal.fire({
      title: "User Information",
      html: `
        <div style="text-align: left;">
          <p style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Default Name: ${this.defaultname}</p>
          ${Object.entries(data).map(([key, value]) => `<p style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">${key}: ${value}</p>`).join('')}
        </div>
      `,
      width: 600,
      padding: "2em",
      showCloseButton: true,
      showConfirmButton: false,
      backdrop: "rgba(0,0,123,0.4) url('/images/nyan-cat.gif') left top no-repeat"
    });
  }


  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you logout Your Id?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authservice.logout();
        Swal.fire({
          title: "Log Out!",
          text: "Your Id Successfully Log Out",
          icon: "success"
        });
      }
    });
  }


}
