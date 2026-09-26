import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  selector: 'app-work-experience',
  styleUrl: './work-experience.css',
  templateUrl: './work-experience.html',
})
export class WorkExperience {}
