import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faHeart , faEye , faComment,faTimesCircle,
         faCommentDots,faEdit } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../services/app.service';

declare var $:any;

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  id:any;
  image:any;
  icons:any = {
    faHeart:faHeart,
    faEye:faEye,
    faComment:faComment,
    faCommentDots:faCommentDots,
    faEdit:faEdit,
    faTimesCircle:faTimesCircle
  }

  updateState:any = {
    title:false,
    description:false
  }

  payload = {    
    comment:'', // A comment to edit
    newComment:'', // A new comment,
    imgTitle:'', // To edit image title
    imgDescription:'' // To edit Image description 
  }

  selectedComment:any; // A comment to delete

  errorMsgs:any = {};
  formValid:boolean = true;
  isliked:boolean = false;
  isMyImage:boolean = false;
  userId = JSON.parse(localStorage.getItem("user")).id;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private appService:AppService) {
                this.route.params.forEach(params => {
                  this.id = params.id;
                  this.getImageDetails();
                })
            }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
  }

  getImageDetails(){
    this.appService.getImageDetails(this.id).subscribe((res:any) =>{
      this.image = res.data;
      this.isliked = this.image.likes.users.indexOf(this.userId) != -1 ? true :false;
      this.isMyImage = this.image.user_id == this.userId ? true : false;      
    })
  }

  updateImage(field){
    if(field == 'title'){
      this.appService.editImage(this.id,{title:this.payload.imgTitle}).subscribe((res:any) =>{
        this.appService.popSuccesToast(res.message);
        this.updateState.title = false;
        this.image.title = this.payload.imgTitle;
      },err =>{
        if(err && err.error){
          this.appService.popErrorToast(err.error.message);
        }
      })
    }
    else if(field == 'description'){
      this.appService.editImage(this.id,{description:this.payload.imgDescription}).subscribe((res:any) =>{
        this.appService.popSuccesToast(res.message);
        this.updateState.description = false;
        this.image.description = this.payload.imgDescription;
      },err =>{
        if(err && err.error){
          this.appService.popErrorToast(err.error.message);
        }
      })
    }
  }

  deleteImage(){ 
    this.appService.deleteImage(this.id).subscribe( (res:any) =>{
      this.appService.popSuccesToast(res.message);
      $("#deleteModal").modal('hide');
      this.router.navigate(['/']);
    },err =>{
      if(err && err.error){
        this.appService.popErrorToast(err.error.message);
      }
    })
  }

  postComment(form){     
    this.errorMsgs = {}
    if(!form.valid){
      this.formValid = false;
      return; 
    }
    this.appService.postComment(this.id,{comment:this.payload.newComment}).subscribe((res:any) =>{
      if(res.success){        
        this.image.comments.push(res.data)
        this.payload.newComment = ''
        this.formValid = true;
        form.reset();        
      }
    },err =>{
      if(err && err.error && err.error.errors){
        Object.keys(err.error.errors).forEach(key =>{
          this.errorMsgs[key] = err.error.errors[key].message
        })
      }
    },() =>{
      this.appService.updateSidebar.next(true);
    })
  }

  likeImage(){
    this.appService.likeImage(this.id).subscribe((res:any) =>{
      this.image.likes = res.likes;
      this.isliked = true;
    },err =>{
      if(err && err.error){
        this.appService.popErrorToast(err.error.message);
      }
    },() =>{
      this.appService.updateSidebar.next(true);
    })
  }

  editComment(comment){
    this.appService.editComment(comment._id,{comment:this.payload.comment}).subscribe((res:any) =>{
      this.appService.popSuccesToast(res.message);
      this.updateState['comment'+comment._id] = false;
      comment.comment = this.payload.comment;
    },err =>{
      if(err && err.error){
        this.appService.popErrorToast(err.error.message);
      }
    })
  }

  openDeleteCommentModal(comment){
    this.selectedComment = comment;
    $("#deleteComment").modal();
  }

  deleteComment(){
    this.appService.deleteComment(this.selectedComment._id).subscribe((res:any) =>{
      this.appService.popSuccesToast(res.message);
      if(this.image.comments){
        this.image.comments.splice(this.image.comments.indexOf(this.selectedComment),1);
      }
      $("#deleteComment").modal('hide');
    },err =>{
      if(err && err.error){
        this.appService.popErrorToast(err.error.message);
      }
    })
  }

}