<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">
<link rel="stylesheet" href="../resources/css/usermanage.css" />
<title>Insert title here</title>
</head>
<body>

	<nav class="navbar-expand-lg navbar navbar-light bg-light m-0 p-0">
		<a class="navbar-brand" href="#"> <img src="../resources/logo.png"
			height="55%" alt="MDB Logo" loading="lazy" />
		</a>

		<div class="collapse navbar-collapse" id="navbarTogglerDemo03">
			<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
				<li class="nav-item active mr-2 ml-2"><a class="nav-link"
					href="#">Sản phẩm <span class="sr-only">(current)</span>
				</a></li>
				<li class="nav-item active mr-2 ml-2"><a class="nav-link"
					href="#">Khách hàng <span class="sr-only">(current)</span>
				</a></li>
				<li class="nav-item active mr-2 ml-2"><a class="nav-link"
					href="#">Users <span class="sr-only">(current)</span>
				</a></li>
			</ul>
			<!-- Right elements -->
			<div class="d-flex align-items-center">
				<!-- Icon -->
				<a class="link-secondary me-3" href="#"> <i
					class="fas fa-shopping-cart"></i>
				</a>
				<div class="dropdown mr-4">
					<img src="../resources/user-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">
					<s:property value="#session.USER" />
				</div>
				<!-- Notifications -->
				<div class="dropdown">

					<button type="button" class="btn btn-primary me-3 mr-2"
						onclick="logout()">Đăng xuất</button>
				</div>
			</div>
			<!-- Right elements -->
		</div>
		</div>
	</nav>
	<div class="head">
		<h3>Users</h3>
		<p class="line-blue"></p>
	</div>
	<div id="user">

		<div class="wrapper-action d-flex justify-content-center">
			<form method="GET" id="searchForm" enctype="multipart/form-data">
				<div class="action-form">
					<div class="search-input d-flex">
						<div class="form-group mr-4">
							<label for="name">Tên</label> <input type="text" name="name"
								class="form-control" id="name" placeholder="Nhập họ tên" />
							<!-- <small id="emailHelp" class="form-text text-muted"
                                >We'll never share your email with anyone else.</small
                            > -->
						</div>
						<div class="form-group mr-4">
							<label for="email">Email</label> <input type="text" name="email"
								class="form-control" id="email" placeholder="Nhập email" />
							<!-- <small id="emailHelp" class="form-text text-muted"
                                >We'll never share your email with anyone else.</small
                            > -->
						</div>
						<div class="form-group mr-4">
							<label for="group">Nhóm</label>
							<!-- <input
                                    type="text"
                                    name="groups"
                                    class="form-control"
                                    id="group"
                                    placeholder="Chọn nhóm"
                                /> -->
							<select name="role" id="group" class="form-control pr-5">
								<option value='' selected>TẤT CẢ</option>
								<option value="Admin">ADMIN</option>
								<option value="Reviewer">REVIEWER</option>
								<option value="Editor">EDITOR</option>
							</select>
							<!-- <small id="emailHelp" class="form-text text-muted"
                                >We'll never share your email with anyone else.</small
                            > -->
						</div>
						<div class="form-group mr-0">
							<label for="inputState">Trạng thái</label> <select name="status"
								id="inputState" class="form-control pr-5">
								<option value="true" selected>Đang hoạt động</option>
								<option value="false">Tạm khóa</option>
							</select>
							<!-- <small id="emailHelp" class="form-text text-muted"
                                >We'll never share your email with anyone else.</small
                            > -->
						</div>
					</div>

					<div class="action d-flex justify-content-between">
						<div class="left">
							<button type="button" class="btn btn-primary" data-toggle="modal"
								data-target="#addModal" class="btn-primary btn"
								onclick="handleChangeAction(false);">Thêm mới</button>
						</div>
						<div class="right">
							<button id="btnSearch" type="button" class="btn-primary btn" >Tìm
								kiếm</button>
							<button type="button" onclick="resetForm()"
								class="btn-success btn">Xóa tìm</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		

		<div class="list-user" id="tablelist">
			<div id="headtb">
				<!-- <p class="font-monospace ml-2 font-weight-bold">hiển thị 1 - 5 trên tổng 20 user</p> -->
			</div>
			
			<table class="table table-striped table-bordered">
				<thead class="bg-danger text-light">
					<tr>
						<th scope="col">STT</th>
						<th scope="col">ID</th>
						<th scope="col">Họ tên</th>
						<th scope="col">Email</th>
						<th scope="col">Role</th>
						<th scope="col">Trạng Thái</th>
						<th scope="col">ACtion</th>
					</tr>
				</thead>
				<tbody id="tbody">
					<s:iterator value="users">
						<!-- <tr>
							<td class="nowrap"><s:property value="id" /></td>
							<td class="nowrap"><s:property value="name" /></td>
							<td class="nowrap"><s:property value="email" /></td>
							<td class="nowrap"><s:property value="groupRole" /></td>
							<td class="nowrap"><s:if test="status">
									<span class="text-success">Đang hoạt động</span>
								</s:if> <s:else>
									<span class="text-danger">Tạm khóa</span>
								</s:else></td>
							<td class="nowrap">
								<button type="button" class="btn btn-primary"
									data-toggle="modal" data-target="#editModal"
									class="btn-primary btn"
									onclick="passDataEditUser(
								<s:property value="id"/>,
								'<s:property value="name"/>',
								'<s:property value="email"/>',
								'<s:property value="groupRole"/>',
								<s:property value="status"/>)">Sửa</button>

								<button type="button" class="btn btn-primary"
									data-toggle="modal" data-target="#deleteModal"
									class="btn-primary btn"
									onclick="passDataRemove(
								<s:property value="id"/>,
								'<s:property value="email"/>',)">xóa</button>

								<button type="button" class="btn btn-primary"
									data-toggle="modal" data-target="#changeSttModal"
									class="btn-primary btn"
									onclick="passDataChangeStt(
									<s:property value="id"/>,
									'<s:property value="email"/>',
									<s:property value="status"/>)">Lock/Unlock</button>
							</td>

						</tr> -->
					</s:iterator>
				</tbody>
				
			</table>

			<nav aria-label="Page navigation example">
				<ul class="pagination ml-2" id="list-pagination">
				  <!-- <li class="page-item"><a class="page-link" href="#">Previous</a></li>
				  <li class="page-item"><a class="page-link" href="#">1</a></li>
				  <li class="page-item"><a class="page-link" href="#">2</a></li>
				  <li class="page-item"><a class="page-link" href="#">3</a></li>
				  <li class="page-item"><a class="page-link" href="#">Next</a></li> -->
				</ul>
			</nav>
			
			<!-- <div id="paging1">
				<div class="container">
					<nav aria-label="Page navigation">
						<ul class="pagination" id="pagination"></ul>
					</nav>
				</div>
			</div> -->
			<form action="" id="formSubmit" method="get">
				<input type="hidden" value="" id="page" name="page"/>
				<input type="hidden" value="" id="size" name="size"/>
			</form>
			
		</div>
		<!-- Modal -->
		<div class="modal fade" id="addModal" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog d-flex justify-content-center">
				<form id="insertForm">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Add</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="form-group row">
								<label for="modalName" class="col-sm-2 col-form-label">Tên
									<small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<input name="name" type="text" class="form-control"
										id="modalName" />
								</div>
								<div class="ml-5">
									<small class="pl-5 ml-5 text-danger" id="errorName"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="modalEmail" class="col-sm-2 col-form-label">Email
									<small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<input name="email" type="email" class="form-control"
										id="modalEmail" />
								</div>
								<div class="ml-5">
									<small class="pl-5 ml-5 text-danger" id="errorEmail"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="modalPassword" class="col-sm-2 col-form-label">Mật
									khẩu <small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<input name="password" type="password" class="form-control"
										id="modalPassword" />
								</div>
								<div class="ml-5">
									<small class="pl-5 ml-5 text-danger" id="errorPassword"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="modalRePassword" class="col-sm-2 col-form-label">Xác
									nhận <small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<input name="repassword" type="password" class="form-control"
										id="modalRePassword" />
								</div>
								<div class="ml-5">
									<small class="pl-5 ml-5 text-danger" id="errorRePassword"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="modalGroup" class="col-sm-2 col-form-label">Nhóm
									<small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<select name="role" id="modalGroup" class="form-control pr-5">
										<option value="Admin">ADMIN</option>
										<option value="Reviewer">REVIEWER</option>
										<option value="Editor">EDITOR</option>
									</select>
								</div>
								<div class="ml-5">
									<small id="errorGroup" class="pl-5 ml-5 text-danger" id="error"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="" class="col-sm-2 col-form-label">Trạng thái</label>
								<input id="CheckStt" type="checkbox" checked name="status" /> <label
									for=""
									class="col-sm-2 col-form-label font-weight-bold text-success"
									id="Stt">Hoạt động ?</label>
							</div>
						</div>
						<div class="modal-footer" id="actionFormEdit">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">Hủy</button>
							<button type="button" id="btnSave" class="btn btn-primary">Lưu</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- end modal -->

		<!-- edit Modal -->
		<div class="modal fade" id="editModal" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog d-flex justify-content-center">
				<form id="insertForm">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Edit</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<input type="hidden" name="id-edit" />
							<div class="form-group row">
								<label for="modalName" class="col-sm-2 col-form-label">Tên
									<small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<input name="name" type="text" class="form-control"
										id="modalName" />
								</div>
								<div class="ml-5">
									<small class="pl-5 ml-5 text-danger" id="errorEditName"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="modalEmail" class="col-sm-2 col-form-label">Email
									<small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<input name="email" type="email" class="form-control"
										id="modalEmail" />
								</div>
								<div class="ml-5">
									<small class="pl-5 ml-5 text-danger" id="errorEditEmail"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="modalGroup" class="col-sm-2 col-form-label">Nhóm
									<small class="text-danger">*</small>
								</label>
								<div class="col-sm-10">
									<select name="role" id="modalGroup" class="form-control pr-5">
										<option value="Admin">ADMIN</option>
										<option value="Reviewer">REVIEWER</option>
										<option value="Editor">EDITOR</option>
									</select>
								</div>
								<div class="ml-5">
									<small id="errorGroup" class="pl-5 ml-5 text-danger" id="error"></small>
								</div>
							</div>
							<div class="form-group row">
								<label for="" class="col-sm-2 col-form-label">Trạng thái</label>
								<input id="CheckStt" type="checkbox" checked name="status" /> <label
									for=""
									class="col-sm-2 col-form-label font-weight-bold text-success"
									id="Stt">Hoạt động ?</label>
							</div>
						</div>
						<div class="modal-footer" id="actionFormEdit">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">Hủy</button>
							<button type="button" id="btnEdit" class="btn btn-primary">Lưu</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- end edit modal -->

		<!-- delete Modal -->
		<div class="modal fade" id="deleteModal" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog d-flex justify-content-center">
				<form id="insertForm">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Delete</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<input type="hidden" name="id-remove" /> Are you sure you wanna
							remove <label style="font-weight: bold; color: red;"></label> ?
						</div>
						<div class="modal-footer" id="actionFormEdit">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">Hủy</button>
							<button type="button" id="btnRemove" class="btn btn-primary">Xóa</button>
						</div>

					</div>
				</form>
			</div>
		</div>
		<!-- end delete modal -->

		<!-- change Modal -->
		<div class="modal fade" id="changeSttModal" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog d-flex justify-content-center">
				<form id="insertForm">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Delete</h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<input type="hidden" name="id-stt" /> <input type="hidden"
								name="stt" /> Are you sure change status <label
								style="font-weight: bold; color: red;"></label> ?
						</div>
						<div class="modal-footer" id="actionFormEdit">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">Hủy</button>
							<button type="button" id="btnChangeStt" class="btn btn-primary">Đổi</button>
						</div>

					</div>
				</form>
			</div>
		</div>
		<!-- end change modal -->
	</div>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.2/jquery.min.js"
		integrity="sha512-tWHlutFnuG0C6nQRlpvrEhE4QpkG1nn2MOUMWmUeRePl4e3Aki0VB6W1v3oLjFtd0hVOtRQ9PHpSfN6u6/QXkQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                crossorigin="anonymous"></script> -->
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
		integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
		crossorigin="anonymous"></script>

	<script src="../resources/js/user.js"></script>
	<script src="../resources/js/jquery.twbsPagination.js" type="text/javascript"></script>

</body>
</html>
