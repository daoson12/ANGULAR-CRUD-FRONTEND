import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from './../form.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
 
// CommonJS



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
   title = 'quickcrud';
   regFormGroup: FormGroup;
   regList: any = [];
   subscription: Subscription;
   term:any;
   p: number = 1;
   submitted: boolean;


  constructor(private service:FormService,private formBuder:FormBuilder, ) { }

  ngOnInit() {
    this.getAllUsers()
    this.regFormGroup=this.formBuder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName:['',[Validators.required]],	
      id:	[],
      lastName:['', [Validators.required]]
    })
    
  }


saveUer():any{

  
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Save`,
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    this.submitted = true;
    if (result.isConfirmed) {
      this.service.addUser(this.regFormGroup.value).subscribe(result=>{
        this.getAllUsers()
        this.regFormGroup.reset();
    
      })
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
  

}


// Get All Categories
 getAllUsers() {
    this.service.getAllUsers().subscribe(result => {
      // this.getAllUsers()
      this.regList = result;
   
      console.log(result)
    });
  }



  
//delete a category
deleteUser(id){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
     this.service.deleteUserById(id).subscribe(res=>{this.getAllUsers();})
     
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your Info has been deleted Successfully.',
        'success',
        
      )
      
    }
    else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary Info is safe :)',
        'error'
      )
    }
   
  })
}

//update category
editUser(data: any){
  this.regFormGroup.patchValue(data);
}

get f() {
  return this.regFormGroup.controls;
}
}
