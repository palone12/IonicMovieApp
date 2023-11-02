import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies  : any= [] ;
  currentPage =1 ;
  imageUrl = environment.images

  constructor(private movieService : MovieService, private loadingCtrl : LoadingController, private router : Router) { }

  ngOnInit() {
    this.loadMovies()
  }

  async loadMovies(event? : InfiniteScrollCustomEvent) {

    const loading = await this.loadingCtrl.create({
      message:'Loading..',
      spinner:'bubbles'
    });
    await loading.present()

    this.movieService.getTopRatedMovies().subscribe(res=> {
      loading.dismiss();
      this.movies.push(...res.results)
      console.log(res);
      event?.target.complete()
    })
  }
  loadMore(event:InfiniteScrollCustomEvent){
 this.currentPage++;
 this.loadMovies(event);
  }

  redirect() {
     this.router.navigate(['movies','details'])
  }

}
