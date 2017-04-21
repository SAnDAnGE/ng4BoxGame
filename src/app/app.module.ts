import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    GameBoardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
