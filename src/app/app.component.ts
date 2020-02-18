import { Component } from '@angular/core';
import{ DataService} from './data.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public GitHubData

  constructor( private getData: DataService) {
   
   }
  title = 'GitHubTask';
  user
  key='login';
  totalRecord = 0;
  reverse = false;

  ngOnInit() {
   console.log(this.GitHubData)
  }

  getGitHubUsers(){
    this.getData.getData(this.user).subscribe((data)=>{
      console.log(data)
       if(data['total_count'] != 0){
        this.GitHubData=data['items']
        this.totalRecord=data['total_count']
       }
    },
    (Error)=>{
      this.GitHubData=[]
    }
    );  
  }

  getProfileDetail(userID){
   this.getData.getProfileDetail(this.user).subscribe((data)=>{
     console.log(data)
   })
  }

  sortData(sortVal,order){
    this.key = sortVal;
    this.reverse = order;
  }
  
}
