import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManegementComponent } from './user-manegement.component';

describe('UserManegementComponent', () => {
  let component: UserManegementComponent;
  let fixture: ComponentFixture<UserManegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManegementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
