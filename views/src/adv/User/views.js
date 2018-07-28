import React,{Component} from "react"
class Views extends Component{
    render(){
        return (
            <div class="tbl-view">
							<table>
								<thead>
									<tr>
										<th><input type="checkbox"/></th>
										<th>TT</th>
										<th colspan="2">Tên đăng nhập</th>
										<th>Tên hiển thị</th>
										<th>Email</th>
										<th>Số điện thoại</th>
										<th>Nhóm quyền</th>
										<th>Ngày</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><input type="checkbox"/></td>
										<td>1</td>
										<td>truyentdm</td>
										<td></td>
										<td>Duong Minh Truyen</td>
										<td>truyentdm@dmainl.com</td>
										<td>098352999</td>
										<td>Admin</td>
										<td>12-7-2016</td>
									</tr>
									<tr>
										<td><input type="checkbox"/></td>
										<td>1</td>
										<td>truyentdm</td>
										<td></td>
										<td>Duong Minh Truyen</td>
										<td>truyentdm@dmainl.com</td>
										<td>098352999</td>
										<td>Admin</td>
										<td>12-7-2016</td>
									</tr>
									<tr>
										<td><input type="checkbox"/></td>
										<td>1</td>
										<td>truyentdm</td>
										<td></td>
										<td>Duong Minh Truyen</td>
										<td>truyentdm@dmainl.com</td>
										<td>098352999</td>
										<td>Admin</td>
										<td>12-7-2016</td>
									</tr>
									<tr>
										<td><input type="checkbox"/></td>
										<td>1</td>
										<td>truyentdm</td>
										<td></td>
										<td>Duong Minh Truyen</td>
										<td>truyentdm@dmainl.com</td>
										<td>098352999</td>
										<td>Admin</td>
										<td>12-7-2016</td>
									</tr>
									<tr>
										<td><input type="checkbox"/></td>
										<td>1</td>
										<td>truyentdm</td>
										<td></td>
										<td>Duong Minh Truyen</td>
										<td>truyentdm@dmainl.com</td>
										<td>098352999</td>
										<td>Admin</td>
										<td>12-7-2016</td>
									</tr>
								
								</tbody>
								<tfoot>
									<tr>
										<th><input type="checkbox"/></th>
										<th>TT</th>
										<th colspan="2">Tên đăng nhập</th>
										<th>Tên hiển thị</th>
										<th>Email</th>
										<th>Số điện thoại</th>
										<th>Nhóm quyền</th>
										<th>Ngày</th>
									</tr>
								</tfoot>
							</table>
							<ul class="dl-control">
								<li>
									Trang 
									<input type="button" value="<"/>
									<input type="text" value="2"/>
									<input type="button" value=">"/>
									trên 10
									&nbsp;&nbsp;|&nbsp;&nbsp;
								</li>
								<li>
									xem
									<select>
										<option value="10">10</option>
									</select>
									bản ghi
									&nbsp;&nbsp;|&nbsp;&nbsp;
								</li>
								<li>Tổng 198 bản ghi</li>
							</ul>
						</div>
        );
    }
}

export default Views