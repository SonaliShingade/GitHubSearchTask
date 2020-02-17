import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  Url
  GitHubData:any
  constructor( private http: HttpClient) { }

  getData(user){
   this.Url = "https://api.github.com/search/users?q="+user
    return this.http.get(this.Url)
    
  }
  getProfileDetail(userName){
    var url="https://api.github.com/users/"+userName+"/repos"
      return this.http.get(url)
  }
}
