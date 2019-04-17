import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionService } from 'src/app/shared/services/sessionservice/session.service';

@Component({
  selector: 'app-config-game-ia',
  templateUrl: './config-game-ia.component.html',
  styleUrls: ['./config-game-ia.component.css']
})
export class ConfigGameIAComponent implements OnInit {
  levels: any;
  gameType = 'Memory';
  constructor(public session: SessionService,
    public authService: AuthService,
    private router: Router,
    private socket: MemoryService, public dialogRef: MatDialogRef<ConfigGameIAComponent>) { }

  ngOnInit() { }
  onClose() {
    this.dialogRef.close();
  }
  startGame() {
    if (this.gameType === 'Memory') {
      this.onSubmitNewGame('');
    }
  }
  onSubmitNewGame(gameID: string) {
    this.setBoardSize();
    this.socket.setGameType('IA');
    const userInfo = this.authService.userData;
    const newGame = {
      name: gameID,
      created: new Date(),
      user: userInfo.displayName,
      numberOfPlayers: 1
    };
    this.session.createSession(newGame).subscribe(
      (data: any) => {
        this.dialogRef.close();
        this.router.navigate([`/memory/`, data.name]);
      },
      err => {
        console.log(err);
      }
    );
  }

  setBoardSize() {
    console.log(this.levels);
    if (this.levels === 'hard') {
      this.socket.setBoardSize(18);
    } else if (this.levels === 'medium') {
      this.socket.setBoardSize(15);
    } else {
      this.socket.setBoardSize(10);
    }
  }
}
