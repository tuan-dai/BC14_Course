import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCourseRoutingModule } from './edit-course-routing.module';
import { EditCourseComponent } from './edit-course.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditCourseComponent],
  imports: [CommonModule, EditCourseRoutingModule, FormsModule],
})
export class EditCourseModule {}
