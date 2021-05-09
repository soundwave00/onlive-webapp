import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Events } from '../entities';

@Component({
  selector: 'app-event-player',
  templateUrl: './event-player.component.html',
  styleUrls: ['./event-player.component.css']
})
export class EventPlayerComponent implements OnInit {

  public msaapDisplayTitle: boolean = false;
  public msaapDisplayPlayList: boolean = false;
  public msaapDisplayVolumeControls: boolean = true;
  public msaapDisplayRepeatControls: boolean = false;
  public msaapDisplayArtist: boolean = true;
  public msaapDisplayDuration: boolean = false;
  public msaapDisablePositionSlider: boolean = false;

  public msaapPlaylist: Track[] = [
    {
      title: 'lofi hip hop radio',
      link: '/../../assets/audio.mp3',
      artist: 'Lofi Artist',
      duration: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
