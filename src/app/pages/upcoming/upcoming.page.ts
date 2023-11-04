import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  upcoming: any = [];
  currentPage = 1;
  imageUrl = environment.images;
  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getUpcoming();
  }
  async getUpcoming(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getUpcomingMovies().subscribe((res) => {
      loading.dismiss();
      this.upcoming.push(...res.results);
      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMoreUpcoming(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.getUpcoming(event);
  }
}
