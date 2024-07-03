import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { VotingModalComponent } from './voting-modal.component';

describe('VotingModalComponent', () => {
  let component: VotingModalComponent;
  let fixture: ComponentFixture<VotingModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<VotingModalComponent>>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [VotingModalComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { pauta: 'Test Pauta' } },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial pauta from MAT_DIALOG_DATA', () => {
    expect(component.pauta).toBe('Test Pauta');
  });

  it('should set selectedAnswer to false on onNoClick', () => {
    component.onNoClick();
    expect(component.selectedAnswer).toBeFalse();
  });

  it('should set selectedAnswer to true on onYesClick', () => {
    component.onYesClick();
    expect(component.selectedAnswer).toBeTrue();
  });

  it('should close the dialog with selectedAnswer on onVoteClick', () => {
    component.selectedAnswer = true;
    component.onVoteClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with selectedAnswer set to undefined', () => {
    component.onVoteClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(undefined);
  });
});
