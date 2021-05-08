import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Events } from '../entities';
import { EventComponent } from '../pages/event-page/event-page.component';

@Component({
  selector: 'app-event-player',
  templateUrl: './event-player.component.html',
  styleUrls: ['./event-player.component.css']
})
export class EventPlayerComponent implements OnInit, EventComponent {

  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = true;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  public eventColumns: string[] = ['Group', 'Description'];
  public liveDetails: Events[] = [];

  constructor() { 
    this.liveDetails = [
      { Name:'Open Mouth Blues Orchestra',Description:'Benvenuti a tutti!' },
      { Name:'Thirty Seconds to Mars',Description:'Benvenuti a tutti!' },
      { Name:'Queen',Description:'Benvenuti a tutti!' },
    ]
  }

  ngOnInit(): void {
  }

  msaapPlaylist: Track[] = [
    {
      title: 'lofi hip hop radio',
      link: './assets/img/Post_Malone_Circles_Official_Lofi_Remix_.mp3',
      artist: 'Lofi Artist',
      duration: 1
    },
  ];

}
