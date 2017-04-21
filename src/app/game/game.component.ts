import {Component, ViewChild} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeWhile';

import {GameBoardComponent} from '../game-board/game-board.component';
import {Box} from '../box';
import {Util} from '../util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild(GameBoardComponent) gameBoard: GameBoardComponent;
  static readonly LIVES: number = 5;
  static readonly TIME_TO_CLICK: number = 3000;
  static readonly TIMER_ACCURACY: number = 200;
  static readonly SELECTED_BOXES: number = 2;
  // static readonly TIME_TO_CLICK: number = 10000;
  // static readonly SELECTED_BOXES: number = 7;
  lives: number = GameComponent.LIVES;

  time_to_click: number = GameComponent.TIME_TO_CLICK;
  duration: number = this.time_to_click;
  score: number = 0;
  selectedBoxes: Box[] | undefined;
  selectedBox: Box | undefined;
  selectedBoxIdentifier: string;
  timerSubscription: Subscription;

  private gameStarted: boolean = false;

  private startRound(): void {
    const timer$ = Observable.timer(GameComponent.TIMER_ACCURACY, GameComponent.TIMER_ACCURACY)
      .takeWhile(() => this.duration > 0)
    ;
    this.selectedBoxes = this.gameBoard.generateSelectedBoxes(GameComponent.SELECTED_BOXES);
    this.selectedBox = this.selectedBoxes[Util.getRandom(0,GameComponent.SELECTED_BOXES-1)];
    this.selectedBoxIdentifier = GameComponent.getRandomTileIdentifier(this.selectedBox);
    this.gameStarted = true;
    this.duration = this.time_to_click;
    this.timerSubscription = timer$.subscribe(() => {
      this.duration -= Math.min(GameComponent.TIMER_ACCURACY, this.duration);
    }, undefined, () => {
      this.onBoxClick();
    });
  }

  private resetGame(): void {
    this.lives = GameComponent.LIVES;
    this.time_to_click = GameComponent.TIME_TO_CLICK;
    this.duration = this.time_to_click;
    this.score = 0;
    this.gameBoard.reset();
    this.selectedBoxes = undefined;
    this.selectedBox = undefined;
    this.gameStarted = false;
    this.timerSubscription.unsubscribe();
  }

  onBoxClick(box: Box | undefined = undefined): void {
    this.timerSubscription.unsubscribe();
    if (Object.is (this.selectedBox, box)) {
      this.score += 1;
      this.time_to_click *= 0.9;
    } else {
      this.lives -= 1;
    }
    this.gameBoard.reset();
    if (this.lives === 0) {
      this.gameBoard.setGameOver();
    } else {
      this.startRound();
    }
  }

  toggleGame(): void {
    if (!this.gameStarted) {
      this.startRound();
    } else {
      this.resetGame();
    }
  }

  private static getRandomTileIdentifier(selectedBox: Box): string {
    return Math.random() >= 0.5 ? `${selectedBox.color} box` : `box with letter ${selectedBox.letter}`;
  }
}
