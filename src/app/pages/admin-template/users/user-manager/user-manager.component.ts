import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  @ViewChild('keyword') domFieldSearch: any;

  listUser: any;
  totalLength: any;
  page: number = 1;

  success: boolean = false;
  error: boolean = false;
  errMess: string = '';

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getListUser();
  }

  //List User
  getListUser() {
    this.data.get(environment.getListUser).subscribe((result) => {
      this.listUser = result;
      this.totalLength = result.length;
    });
  }
  //Search User
  searchUser(keyword: any) {
    this.data
      .get(`api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`)
      .subscribe((result) => (this.listUser = result));
  }

  clearSearch() {
    this.domFieldSearch.nativeElement.value = '';
    this.ngOnInit();
  }

  //Delete User
  deleteUser(user: any) {
    window.confirm('Bạn có chắc muốn xóa tài khoản này?');
    this.data
      .delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user.taiKhoan}`)
      .subscribe({
        error: (error) => (
          (this.error = true),
          error.status === 200
            ? (this.errMess = error.error.text)
            : (this.errMess = error.error)
        ),
      });
    setTimeout(() => location.reload(), 2000);
  }
}
