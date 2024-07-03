import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SectionApi } from '../core/api/app/section.api';
import { VoteApi } from '../core/api/app/vote.api';
import { IResponseLogin } from '../core/api/interfaces/ILogin';
import {
  ICreateSectionRequest,
  IGetAllSectionsResponse,
} from '../core/api/interfaces/ISection';
import { IVoteBody } from '../core/api/interfaces/IVote';
import { NewPautaModalComponent } from '../new-pauta-modal/new-pauta-modal.component';
import { VotingModalComponent } from '../voting-modal/voting-modal.component';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-pautas-list',
  templateUrl: './pautas-list.component.html',
  styleUrls: ['./pautas-list.component.scss'],
})
export class PautasListComponent {
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private sectionApi: SectionApi,
    private voteApi: VoteApi,
    private router: Router
  ) {}

  public userData: IResponseLogin = {
    name: '',
    email: '',
    cpf: '',
    id: 0,
  };

  public openPautasArray: IGetAllSectionsResponse[] = [];
  public expiredPautasArray: IGetAllSectionsResponse[] = [];

  public newPauta: ICreateSectionRequest = {
    name: '',
    description: '',
    expiration: 0,
  };

  async ngOnInit(): Promise<void> {
    await this.getUserData();
    await this.getAllPautas();
  }

  async getUserData() {
    this.userData = JSON.parse(localStorage.getItem('@UserData') || '{}');
  }

  async getAllPautas(): Promise<void> {
    try {
      const response = await this.sectionApi.getAllSections(this.userData.id);
      response.forEach((pauta) => {
        if (pauta.isExpired) {
          this.expiredPautasArray.push(pauta);
        } else {
          this.openPautasArray.push(pauta);
        }
      });
    } catch (error) {
      this.toastr.error('Erro ao buscar as pautas');
    }
  }

  calculateVotes(pauta: IGetAllSectionsResponse): boolean {
    return pauta.votesTrue > pauta.votesFalse;
  }

  async createNewPauta(newPauta: ICreateSectionRequest) {
    try {
      const createdPauta = await this.sectionApi.createSection(newPauta);
      this.openPautasArray.push({
        ...createdPauta,
        hasVoted: false,
        totalVotes: 0,
        votesTrue: 0,
        votesFalse: 0,
        isExpired: false,
      });
      this.toastr.success('Pauta criada com sucesso!');
    } catch (error) {
      this.toastr.error('Erro ao criar a pauta');
    }
  }

  async voteOnPauta(voteObject: IVoteBody) {
    try {
      await this.voteApi.voteOnSection(voteObject);

      //Updating array
      const votedPauta = this.openPautasArray.find(
        (pauta) => pauta.id === voteObject.sectionId
      );
      if (votedPauta) {
        const newPauta = { ...votedPauta, hasVoted: true };
        const index = this.openPautasArray.indexOf(votedPauta);
        this.openPautasArray.splice(index, 1, newPauta);
      }

      this.toastr.success('Voto computado com sucesso!');
    } catch (error: any) {
      this.toastr.error(error.error);
    }
  }

  async logOut() {
    localStorage.removeItem('@UserData');
    this.router.navigate(['/login']);
  }

  async openVotingDialog(currentPauta: any) {
    const dialogRef = this.dialog.open(VotingModalComponent, {
      width: '500px',
      data: { pauta: currentPauta },
    });

    dialogRef.afterClosed().subscribe((vote) => {
      this.voteOnPauta({
        sectionId: currentPauta.id,
        userId: this.userData.id,
        vote: vote,
      });
    });
  }

  openNewPautaDialog() {
    const dialogRef = this.dialog.open(NewPautaModalComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (
        result.name.length > 0 &&
        result.description.length > 0 &&
        result.expiration != undefined
      ) {
        this.createNewPauta(result);
      }
    });
  }
}
