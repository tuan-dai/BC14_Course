import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  success: boolean = false;
  error: boolean = false;
  errMess: string = '';

  id: any;
  file: any = [];
  courseCatagory: any;
  courseInfo: any;
  listUser: any = [];

  constructor(private data: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getParamsFromUrl();
    this.getCourseCatagory();
    this.getListUser();
  }

  getParamsFromUrl() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.data
      .get(`api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${this.id}`)
      .subscribe((result) => (this.courseInfo = result));
  }

  //Lay danh muc khoa hoc
  getCourseCatagory() {
    this.data
      .get(environment.getCourseCatagory)
      .subscribe((result) => (this.courseCatagory = result));
  }

  //Lay danh sach nguoi dung
  getListUser() {
    this.data
      .get(environment.getListUser)
      .subscribe(
        (result) =>
          (this.listUser = result.filter(
            (user: any) => user.maLoaiNguoiDung === 'GV'
          ))
      );
  }

  nameFile(e: any) {
    this.file = e.target.files[0];
  }

  editCourse(course: any) {
    console.log(course);
  }
}
