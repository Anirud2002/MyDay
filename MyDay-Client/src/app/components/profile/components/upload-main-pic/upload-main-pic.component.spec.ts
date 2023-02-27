import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMainPicComponent } from './upload-main-pic.component';

describe('UploadMainPicComponent', () => {
  let component: UploadMainPicComponent;
  let fixture: ComponentFixture<UploadMainPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMainPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMainPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
