import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { SectionApi } from '../core/api/app/section.api';
import { VoteApi } from '../core/api/app/vote.api';
import { PautasListComponent } from './pautas-list.component';

describe('PautasListComponent', () => {
  let component: PautasListComponent;
  let fixture: ComponentFixture<PautasListComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let sectionApiSpy: jasmine.SpyObj<SectionApi>;
  let voteApiSpy: jasmine.SpyObj<VoteApi>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);
    sectionApiSpy = jasmine.createSpyObj('SectionApi', [
      'getAllSections',
      'createSection',
    ]);
    voteApiSpy = jasmine.createSpyObj('VoteApi', ['voteOnSection']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PautasListComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: SectionApi, useValue: sectionApiSpy },
        { provide: VoteApi, useValue: voteApiSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PautasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on ngOnInit', fakeAsync(() => {
    spyOn(component, 'getUserData').and.callThrough();
    spyOn(component, 'getAllPautas').and.callThrough();

    component.ngOnInit();
    tick();

    expect(component.getUserData).toHaveBeenCalled();
    expect(component.getAllPautas).toHaveBeenCalled();
  }));

  it('should get user data from localStorage', fakeAsync(() => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      cpf: '123456789',
      id: 1,
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userData));

    component.getUserData();
    tick();

    expect(component.userData).toEqual(userData);
  }));

  it('should fetch all pautas and categorize them', fakeAsync(async () => {
    const pautas = [
      {
        id: 1,
        isExpired: false,
        votesTrue: 0,
        votesFalse: 0,
        hasVoted: false,
        totalVotes: 0,
        name: 'Pauta 1',
        description: '',
        expiration: 0,
        start_at: '',
      },
      {
        id: 2,
        isExpired: true,
        votesTrue: 0,
        votesFalse: 0,
        hasVoted: false,
        totalVotes: 0,
        name: 'Pauta 2',
        description: '',
        expiration: 0,
        start_at: '',
      },
    ];

    sectionApiSpy.getAllSections.and.returnValue(Promise.resolve(pautas));

    await component.getAllPautas();
    tick();

    expect(component.openPautasArray.length).toBe(1);
    expect(component.expiredPautasArray.length).toBe(1);
  }));

  it('should show error toast on failing to fetch pautas', fakeAsync(async () => {
    sectionApiSpy.getAllSections.and.returnValue(Promise.reject('Error'));

    await component.getAllPautas();
    tick();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith(
      'Erro ao buscar as pautas'
    );
  }));

  it('should create a new pauta and show success toast', fakeAsync(async () => {
    const newPauta = {
      name: 'New Pauta',
      description: 'New Description',
      expiration: 1,
      id: 1,
      start_at: '',
      expired: false,
    };
    sectionApiSpy.createSection.and.returnValue(Promise.resolve(newPauta));

    await component.createNewPauta(newPauta);
    tick();

    expect(component.openPautasArray.length).toBe(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(
      'Pauta criada com sucesso!'
    );
  }));

  it('should show error toast on failing to create new pauta', fakeAsync(async () => {
    sectionApiSpy.createSection.and.returnValue(Promise.reject('Error'));

    await component.createNewPauta(component.newPauta);
    tick();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith(
      'Erro ao criar a pauta'
    );
  }));

  it('should vote on pauta and show success toast', fakeAsync(async () => {
    const voteObject = { sectionId: 1, userId: 1, vote: true };
    voteApiSpy.voteOnSection.and.returnValue(Promise.resolve());

    await component.voteOnPauta(voteObject);
    tick();

    expect(toastrServiceSpy.success).toHaveBeenCalledWith(
      'Voto computado com sucesso!'
    );
  }));

  it('should show error toast on failing to vote on pauta', fakeAsync(async () => {
    const voteObject = { sectionId: 1, userId: 1, vote: true };
    voteApiSpy.voteOnSection.and.returnValue(
      Promise.reject({ error: 'Error' })
    );

    await component.voteOnPauta(voteObject);
    tick();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Error');
  }));

  it('should open voting dialog and handle result', fakeAsync(() => {
    const pauta = {
      id: 1,
      name: 'Test Pauta',
      description: '',
      expiration: 0,
      isExpired: false,
      votesTrue: 0,
      votesFalse: 0,
      hasVoted: false,
      totalVotes: 0,
    };
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(true),
      close: null,
    });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openVotingDialog(pauta);
    tick();

    expect(dialogSpy.open).toHaveBeenCalled();
  }));

  it('should log out and navigate to login', fakeAsync(() => {
    spyOn(localStorage, 'removeItem');

    component.logOut();
    tick();

    expect(localStorage.removeItem).toHaveBeenCalledWith('@UserData');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
