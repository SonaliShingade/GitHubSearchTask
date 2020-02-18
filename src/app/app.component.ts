import { Component } from '@angular/core';
import{ DataService} from './data.service';
import { Subject } from 'rxjs';
import { debounceTime,distinctUntilChanged } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'GitHubTask';
  user
  key='login';
  totalRecord = 0;
  reverse = false;
  public GitHubData
  public profileData
  public detailsButton:boolean = true;
  
  userInput = new Subject<string>();

  constructor( private getDataService: DataService) {
    this.userInput.pipe(
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(value => {
        this.user=value;
        this.getGitHubUsers()      
      });
   }

  getGitHubUsers(){
    this.getDataService.getData(this.user).subscribe((data)=>{
      console.log(data)
       if(data['total_count'] != 0){
        this.GitHubData=data['items']
        this.totalRecord=data['total_count']
       }
    },
    (Error)=>{
      this.GitHubData=[]
      this.totalRecord=0
    }
    );  
  }

  getProfileDetail(userID){
   this.getDataService.getProfileDetail(this.user).subscribe((data)=>{
     this.profileData=data
     this.detailsButton=!this.detailsButton
   })
  }

  sortData(sortVal,order){
    this.key = sortVal;
    this.reverse = order;
  }
}
