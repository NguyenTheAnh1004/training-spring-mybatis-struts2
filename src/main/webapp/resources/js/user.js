// add
let search = false;
let name = '';
let email = '';
let role = '';
let status = true;
let currentPage = 1;
let pageNumberIndex = 0;
let limitsize = 4;
// getUsers();
getUsersByPage(1,limitsize);
// loadPage();
// if(search == false){
// 	loadPage();
// 	console.log(search)
// }
// else{
// 	loadPageSearch();
// 	console.log(search)
// }
let totalItems;
let boolean;
$("#btnSave").click(async function() {
	var name = $('#addModal input[name="name"]').val();
	var email = $('#addModal input[name="email"]').val();
	var password = $('#addModal input[name="password"]').val();
	var repassword = $('#addModal input[name="repassword"]').val();
	var role = $('#addModal select[name="role"] option:selected').val();
	var status = $('#addModal input[name="status"]').is(':checked');
	await Validation();
	if (boolean == true) {
		$.ajax({
			url: 'insertuser.do',
			method: 'post',
			data: 'name=' + name
				+ '&email=' + email
				+ '&password=' + password
				+ '&role=' + role
				+ '&status=' + status,
			success: function(response) {
				if (response) {
					// getUsers();
					// getUsersByPage(currentPage,5);
					// getUsersByPage(pageNumberIndex+1,5);
					location.reload()
				}
				else {
					showToast('Oops!', ' Failed! :D :D :D', 0);
				}
			}
		});
		$('#addModal').modal('hide')
	}

});

// edit 
let mailEdit;
function passDataEditUser(id, name, email, role, stt) {
	// getUsers();
	mailEdit = email;
	$('#editModal input[name="id-edit"]').val(id);
	$('#editModal input[name="name"]').val(name);
	$('#editModal input[name="email"]').val(email);
	$('#editModal select').val(role);
	stt == true ? $('#editModal input[name="status"]').prop('checked', true) : $('#editModal input[name="status"]').prop('checked', false);
}

$("#btnEdit").click(async function() {
	var name = $('#editModal input[name="name"]').val();
	var email = $('#editModal input[name="email"]').val();
	var role = $('#editModal select[name="role"] option:selected').val();
	var id = $('#editModal input[name="id-edit"]').val();
	var status = $('#editModal input[name="status"]').is(':checked');
	await ValidationEdit();
	if (boolean == true) {
		$.ajax({
			url: 'updateuser.do',
			method: 'post',
			data: 'name=' + name
				+ '&email=' + email
				+ '&role=' + role
				+ '&id=' + id
				+ '&status=' + status,
			success: function(response) {
				if (response) {
					// getUsers();
					if(search == true){
						location.reload();
					}
					else{
						getUsersByPage(pageNumberIndex+1,limitsize);
					}
				}
				else {
					showToast('Oops!', ' Failed! :D :D :D', 0);
				}
			}
		});
	}
	$('#editModal').modal('hide')
});

// end edit

// set error message
function setError(id, data) {
	document.getElementById(id).innerHTML = data;
}

// Validation add
async function Validation() {
	var name = $('#addModal input[name="name"]').val();
	var email = $('#addModal input[name="email"]').val();
	var password = $('#addModal input[name="password"]').val();
	var repassword = $('#addModal input[name="repassword"]').val();
	var role = $('#addModal select[name="role"] option:selected').val();
	boolean = true;

	// validate name

	if (name.length < 6) {
		setError("errorName", 'Tên không được để trống và phải trên 5 ký tự');
		boolean = false;
	}
	else {
		setError("errorName", '');
	}
	// validate mail
	var regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	let user = await getUserByMail(email);
	if (email == "") {
		setError("errorEmail", 'Vui lòng nhập email');
		boolean = false;
	}
	else if (regexmail.test(email) == false) {
		setError("errorEmail", 'Mail sai định dạng - phải có @ và không có ký tự đặc biệt');
		boolean = false;
	}
	else if (user != null) {
		setError("errorEmail", 'Mail này đã được đăng ký vui lòng đăng ký mail khác');
		boolean = false;
	}
	else {
		setError("errorEmail", '');
	}

	// validate pass
	var regexpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
	if (password == "") {
		setError("errorPassword", 'Vui lòng nhập password');
		boolean = false;
	}
	else if (regexpass.test(password) == false) {
		setError("errorPassword", 'pass phải từ 6 ký tự, có chữ in chữ thường và số');
		boolean = false;
	}
	else {
		setError("errorPassword", '');
	}

	//validate repass
	if (repassword != password) {
		setError("errorRePassword", 'Mật khẩu xác nhận không khớp với mật khẩu');
		boolean = false;
	} else {
		setError("errorRePassword", '');
	}

	return boolean;
}

// Validation edit
async function ValidationEdit() {
	var name = $('#editModal input[name="name"]').val();
	var email = $('#editModal input[name="email"]').val();
	var role = $('#editModal  select[name="role"] option:selected').val();
	boolean = true;

	// validate name

	if (name.length < 6) {
		setError("errorEditName", 'Tên không được để trống và phải trên 5 ký tự');
		boolean = false;
	}
	else {
		setError("errorEditName", '');
	}
	// validate mail
	var regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	let user = await getUserByMail(email);
	if (email == "") {
		setError("errorEditEmail", 'Vui lòng nhập email');
		boolean = false;
	}
	else if (regexmail.test(email) == false) {
		setError("errorEditEmail", 'Mail sai định dạng - phải có @ và không có ký tự đặc biệt');
		boolean = false;
	}
	else if (user != null && email != mailEdit) {
		setError("errorEditEmail", 'Mail này đã được đăng ký vui lòng đăng ký mail khác');
		boolean = false;
	}
	else {
		setError("errorEditEmail", '');
	}
	return boolean;
}

async function getUserByMail(email) {
	var data = await $.ajax({
		type: 'GET',
		url: 'getuserbymail.do',
		data: 'email=' + email,
		success: function(data) {
			// console.log(data.userBean);
			// console.log(data.userBean.name);
		},
	});
	return data.userBean;
}


// delete
function passDataRemove(id, email) {
	$('#deleteModal input[name="id-remove"]').val(id);
	$('#deleteModal label').html(email);
}
$("#btnRemove").click(async function() {
	var id = $('#deleteModal input[name="id-remove"]').val();
	$.ajax({
		url: 'deleteuser.do',
		method: 'post',
		data: 'id=' + id,
		success: function(response) {
			if (response) {
				// loadPage();
				// getUsersByPage(pageNumberIndex+1,5);
				location.reload();

			}
			else {
				showToast('Oops!', ' Failed! :D :D :D', 0);
			}
		}
		
	});
	$('#deleteModal').modal('hide')
});


// change stt
function passDataChangeStt(id, email, stt) {
	$('#changeSttModal input[name="id-stt"]').val(id);
	$('#changeSttModal input[name="stt"]').val(stt);
	$('#changeSttModal label').html(email);
}

$("#btnChangeStt").click(function() {
	var id = $('#changeSttModal input[name="id-stt"]').val();
	var stt = $('#changeSttModal input[name="stt"]').val();
	$.ajax({
		url: 'changesttuser.do',
		method: 'post',
		data: 'id=' + id
			+ '&status=' + stt,
		success: function(response) {
			if (response) {
				if(search == true){
					location.reload();
				}
				else{
					getUsersByPage(pageNumberIndex+1,limitsize);
				}
				
				
			}
			else {
				showToast('Oops!', ' Failed! :D :D :D', 0);
			}
		}
	});
	// loadPage();
	$('#changeSttModal').modal('hide')
});

// logout
function logout() {
	window.location.href = '/logout.do';
}
//api get list data with page number
async function getUsers(page = 0, size = 10) {
	var data = await $.ajax({
		type: 'GET',
		url: 'listuser.do',
		data: 'page=' + page + '&size=' + size,
		success: function(data) {
			// loadDataUser(data.users);
			console.log(data.users)
		},
	});  
	console.log('tataaaaa'+data.users)
	console.log('pages'+data.users.length)
	return data.totalUsers;
}

async function getAllUsersSearch() {
	this.name = $('#searchForm input[name="name"]').val();
	this.email = $('#searchForm input[name="email"]').val();
	this.role = $('#searchForm select[name="role"] option:selected').val();
	this.status = $('#searchForm select[name="status"] option:selected').val();
	if(this.status == ''){
		var data = await $.ajax({
			type: 'GET',
			url: 'listusersearch.do',
			data: 'name=' + this.name
			+ '&email=' + this.email
			+ '&role=' + this.role,
			success: function(data) {
				// loadDataUser(data.users);
				// console.log(data.users)
			},
		});  
	}
	else{
		var data = await $.ajax({
			type: 'GET',
			url: 'listusersearch.do',
			data: 'name=' + this.name
			+ '&email=' + this.email
			+ '&role=' + this.role
			+ '&status=' + this.status,
			success: function(data) {
				// loadDataUser(data.users);
				// console.log(data.users)
			},
		});  
	}
	
	return data.totalUsers;
}

function getUsersByPage(page = 1, size = 10) {
	$.ajax({
		type: 'GET',
		url: 'listuserpage.do',
		data: 'page=' + page + '&size=' + size,
		success: function(data) {
			loadDataUser(data.users);
		},
	});
}

function getSearchUsers(page = 1, size = limitsize, name = '', email = '', role = '', status) {
	this.name = $('#searchForm input[name="name"]').val();
	this.email = $('#searchForm input[name="email"]').val();
	this.role = $('#searchForm select[name="role"] option:selected').val();
	this.status = $('#searchForm select[name="status"] option:selected').val();
	// alert('status là' + status )
	if(status == '' || typeof(status) === "undefined"){
		$.ajax({
			type: 'GET',
			url: 'searchuser.do',
			data: 'name=' + name
			+ '&email=' + email
			+ '&role=' + role
			+ '&page=' + page 
			+ '&size=' + size,
			success: function(data) {
				console.log(data.users);
				loadDataUser(data.users);
			},
		});
	}
	else{
		$.ajax({
			type: 'GET',
			url: 'searchuser.do',
			data: 'name=' + name
			+ '&email=' + email
			+ '&role=' + role
			+ '&status=' + status
			+ '&page=' + page 
			+ '&size=' + size,
			success: function(data) {
				console.log(data.users);
				loadDataUser(data.users);
			},
		});
	}

}


//search

$("#btnSearch").click(function() {
	this.name = $('#searchForm input[name="name"]').val();
	this.email = $('#searchForm input[name="email"]').val();
	this.role = $('#searchForm select[name="role"] option:selected').val();
	this.status = $('#searchForm select[name="status"] option:selected').val();
	search = true;
	console.log('sear' + search);
	activeNumber(0);
	console.log('data'+this.name+this.email+this.role+this.status)
	getSearchUsers(1,limitsize,this.name,this.email,this.role,this.status);
	
});


//loaddata
async function loadDataUser(data) {
	var users = data;
	var userData = '';
	// var pagination = '';
	if(data.length <= 0){
		userData += `<p>khong co du lieu ...</p>`;
	}
	for (var i = 0; i < data.length; i++) {
		userData += `
		<tr>
							<td class="nowrap">${pageNumberIndex*limitsize+i+1}</td>
							<td class="nowrap">${users[i].id ? users[i].id : ''}</td>
							<td class="nowrap">${users[i].name ? users[i].name : ''}</td>
							<td class="nowrap">${users[i].email ? users[i].email : ''}</td>
							<td class="nowrap">${users[i].groupRole ? users[i].groupRole : ''}</td>
							<td class="nowrap">${
                                users[i].status == true
                                    ? '<span class="text-success">Đang hoạt động</span>'
                                    : '<span class="text-danger">Tạm khóa</span>'
                            }
							<td class="nowrap d-flex justify-content-center">
								<button type="button" class="btn btn-primary mr-2"
									data-toggle="modal" data-target="#editModal"
									class="btn-primary btn"
									onclick="passDataEditUser(
										${users[i].id},
								'${users[i].name}',
								'${users[i].email}',
								'${users[i].groupRole}',
								${users[i].status})">Sửa</button>

								<button type="button" class="btn btn-primary mr-2"
									data-toggle="modal" data-target="#deleteModal"
									class="btn-primary btn"
									onclick="passDataRemove(
										${users[i].id},
								'${users[i].email}',)">xóa</button>

								<button type="button" class="btn btn-primary mr-2"
									data-toggle="modal" data-target="#changeSttModal"
									class="btn-primary btn"
									onclick="passDataChangeStt(
										${users[i].id},
									'${users[i].email}',
									${users[i].status})">Khóa/Mở Khóa</button>
							</td>

						</tr>
		`;
	}

	
	$('#tbody').html(userData);
	console.log('pageNumberIndex'+pageNumberIndex)

	var pagination;
	if(search == true ){
		pagination = `				
		<li class="page-item"><a class="page-link" href="#" onclick="getSearchUsers(${pageNumberIndex},${limitsize}, '${this.name}','${this.email}','${this.role}',${this.status}), activeNumber(${pageNumberIndex-1})">Previous</a></li>
		`;
	}
	else{
		pagination = `				
		<li class="page-item"><a class="page-link" href="#" onclick="getUsersByPage(${pageNumberIndex},${limitsize}), activeNumber(${pageNumberIndex-1})">Previous</a></li>
		`;
	}

	let totalusers = search == true ? await getAllUsersSearch() : await getUsers();
	// console.log('totalpage'+Math.ceil(totalusers.length/limitsize)+totalusers.length)
	for (var i = 0; i < Math.ceil(totalusers/limitsize); i++){
		if( i == pageNumberIndex){
			pagination += `				
			<li class="page-item active">
			<a class="page-link" href="#">${i+1} <span class="sr-only">(current)</span></a>
			</li>
			`;
		}
		else{
			if(search == true){
				pagination += `				
				<li class="page-item" active><a class="page-link" href="#" onclick="getSearchUsers(${i+1},${limitsize}, '${this.name}','${this.email}','${this.role}',${this.status}), activeNumber(${i})">${i+1}</a></li>
				`;
			} 
			else{
				pagination += `				
				<li class="page-item" active><a class="page-link" href="#" onclick="getUsersByPage(${i+1},${limitsize}), activeNumber(${i})">${i+1}</a></li>
				`;
			}
		}
		
		
	}
	if(search == true ){
		pagination += `				
		<li class="page-item"><a class="page-link" href="#" onclick="getSearchUsers(${pageNumberIndex+2 <= Math.ceil(totalusers/limitsize) ? pageNumberIndex+2:Math.ceil(totalusers/limitsize)},${limitsize}, '${this.name}','${this.email}','${this.role}',${this.status}), activeNumber(${pageNumberIndex+1 <= Math.ceil(totalusers/limitsize)-1 ? pageNumberIndex+1 :pageNumberIndex})">Next</a></li>
		`;
	}
	else{
		pagination += `				
		<li class="page-item"><a class="page-link" href="#" onclick="getUsersByPage(${pageNumberIndex+2 <= Math.ceil(totalusers/limitsize) ? pageNumberIndex+2:Math.ceil(totalusers/limitsize)  },${limitsize}), activeNumber(${pageNumberIndex+1 <= Math.ceil(totalusers/limitsize)-1 ? pageNumberIndex+1 :pageNumberIndex})">Next</a></li>
		`;
	}

	$('#list-pagination').html(pagination);
	console.log(pagination)

	var headtb;
	headtb = `
	<p class="font-monospace ml-2 font-weight-bold">hiển thị ${pageNumberIndex*limitsize+1} - ${pageNumberIndex*limitsize+data.length} trên tổng ${totalusers} user</p>
	`;
	$('#headtb').html(headtb);
}

function activeNumber(pageIndex = 0) {
	pageNumberIndex = pageIndex;
}
// page
// async function loadPage(){
// 	var pagination;
// 	pagination = `				
// 	<div class="container">
// 		<nav aria-label="Page navigation">
// 			<ul class="pagination" id="pagination"></ul>
// 		</nav>
// 	</div>
// 	`;
// 	$('#paging1').html(pagination);
// 	console.log(pagination)
// }

// async function loadPageSearch(){
// 	var pagination;
// 	pagination = `				
// 	<div class="container">
// 		<nav aria-label="Page navigation">
// 			<ul class="pagination" id="pagination1"></ul>
// 		</nav>
// 	</div>
// 	`;
// 	$('#paging1').html(pagination);
// 	console.log(pagination)
// }




// $(async function () {
// 	let totalusers = await getUsers()
// 	console.log('tata'+totalusers.length/5);
// 	window.pagObj = $('#pagination').twbsPagination({
// 		totalPages: Math.ceil(totalusers.length/5),
// 		visiblePages: 5,
// 		startPage: currentPage,
// 		onPageClick: function (event, page) {
// 			console.log(search)
// 			if(search == false){
// 				getUsersByPage(page,5);
// 			}
// 			else{
// 				this.name = $('#searchForm input[name="name"]').val();
// 				this.email = $('#searchForm input[name="email"]').val();
// 				this.role = $('#searchForm select[name="role"] option:selected').val();
// 				this.status = $('#searchForm select[name="status"] option:selected').val();
// 				console.log('fg'+this.role);
// 				getSearchUsers(page,5,this.name,this.email,this.role,this.status);
// 			}
			
// 			currentPage = page;
// 			console.log(currentPage);
// 		}
// 	}).on('page', function (event, page) {
// 		console.info(page + ' (from event listening)');
// 	});
// });

// let currentPage = 1;
// $(async function loadpaging () {

// 	let totalusers = await getUsers()
// 	var limit;
// 	if(search == true){
// 		limit = 1;
// 	}else{
// 		limit = Math.ceil(totalusers.length/5);
// 	}
// 	console.log('tata'+totalusers.length/5);
// 	window.pagObj = $('#pagination1').twbsPagination({
// 		totalPages: 1,
// 		visiblePages: 5,
// 		startPage: currentPage,
// 		onPageClick: function (event, page) {
// 			console.log(search)
// 			if(search == false){
// 				getUsersByPage(page,5);
// 			}
// 			else{
// 				this.name = $('#searchForm input[name="name"]').val();
// 				this.email = $('#searchForm input[name="email"]').val();
// 				this.role = $('#searchForm select[name="role"] option:selected').val();
// 				this.status = $('#searchForm select[name="status"] option:selected').val();
// 				console.log('fg'+this.role);
// 				getSearchUsers(page,5,this.name,this.email,this.role,this.status);
// 				loadPageSearch()
// 			}
			
// 			currentPage = page;
// 			console.log(currentPage);
			
// 		}
// 	}).on('page', function (event, page) {
// 		console.info(page + ' (from event listening)');
// 	});
// });


function resetForm() {
	pageNumberIndex = 0;
	$('#searchForm').trigger('reset');
	search = false;
	console.log(search);
	getUsersByPage(1,limitsize);
	// getUsers();
}