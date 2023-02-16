let pageNumberIndex = 0;
let boolean;
let search = false;
let productname = '';
let	active;
let	priceFrom;
let	priceTo;
getProductsByPage(1,5)

function activeNumber(pageIndex = 0) {
	pageNumberIndex = pageIndex;
	// alert(pageNumberIndex)
}

async function getProducts() {
	var data = await $.ajax({
		type: 'GET',
		url: 'listproduct.do',
		success: function(data) {
			loadDataProduct(data.products);
		},
	});
	console.log('data'+data.products)
}

async function getAllProducts() {
	var data = await $.ajax({
		type: 'GET',
		url: 'listproduct.do',
		success: function(data) {
			// loadDataProduct(data.products);
		},
	});
	console.log('data'+data.products)
	return data.products;
}

$("#btnSearchProduct").click(function() {
	this.productname = $('#searchProductForm input[name="productName"]').val();
	this.active = $('#searchProductForm select[name="product-active"] option:selected').val();
	this.priceFrom = $('#searchProductForm input[name="priceFrom"]').val();
	this.priceTo = $('#searchProductForm input[name="priceTo"]').val();
	search = true;
	// alert(productname + active + priceFrom + priceTo);
	getSearchProducts(page = 1, size = 5, this.productname, this.active, this.priceFrom, this.priceTo)
	// console.log('sear' + search);
	activeNumber(0);
	// console.log('data'+this.name+this.email+this.role+this.status)
	// getSearchUsers(1,5,this.name,this.email,this.role,this.status);

	
});

function getSearchProducts(page = 1, size = 5, productname = '', active = 1, priceFrom = 0, priceTo = 500) {
	$.ajax({
		type: 'GET',
		url: 'listproductsearch.do',
		data: 'name=' + productname
		+ '&stt=' + active
		+ '&princeFrom=' + priceFrom
		+ '&princeTo=' + priceTo
		+ '&page=' + page 
		+ '&size=' + size,
		success: function(data) {
			console.log(data.products);
			loadDataProduct(data.products);
		},
	});
}

async function getAllProductsSearch() {
	this.productname = $('#searchProductForm input[name="productName"]').val();
	this.active = $('#searchProductForm select[name="product-active"] option:selected').val();
	this.priceFrom = $('#searchProductForm input[name="priceFrom"]').val();
	this.priceTo = $('#searchProductForm input[name="priceTo"]').val();
	var data = await $.ajax({
		type: 'GET',
		url: 'listallproductsearch.do',
		data: 'name=' + this.productname
		+ '&stt=' + this.active
		+ '&princeFrom=' + this.priceFrom
		+ '&princeTo=' + this.priceTo,
		success: function(data) {
			console.log('res:' + data.products);
			// loadDataProduct(data.products);
		},
	});
	console.log('data'+ data.products)
	return data.products;
}

async function getProductsByPage(page = 1, size = 5) {
	$.ajax({
		type: 'GET',
		url: 'listproductpage.do',
		data: 'page=' + page + '&size=' + size,
		success: function(data) {
			loadDataProduct(data.products);
		},
	});
}

async function loadDataProduct(data) {
    console.log(data);
	var products = data;
	var productData = '';
	// var pagination = '';
	if(data.length <= 0){
		productData += `<p>khong co du lieu ...</p>`;
	}
	for (var i = 0; i < products.length; i++) {
		productData += `
		<tr>
							<td class="nowrap">${pageNumberIndex*5+i+1}</td>
							<td class="nowrap">${products[i].id ? products[i].id : ''}</td>
							<td class="nowrap">${products[i].name ? products[i].name : ''}</td>
							<td class="nowrap">${products[i].shortDes ? products[i].shortDes : ''}</td>
							<td class="nowrap">${products[i].prince ? products[i].prince : ''}</td>
							<td class="nowrap">${
                            (products[i].active == 3) ?
								'<span class="text-danger">Hết hàng</span>'
                                : products[i].active == 1
								? '<span class="text-success">Đang bán</span>'
								: '<span class="text-danger">Ngưng bán</span>'
                            }
							<td class="nowrap d-flex justify-content-center">
								<button type="button" class="btn btn-primary mr-2"
									data-toggle="modal" data-target="#editProductModal"
									class="btn-primary btn"
									onclick="passDataEditProduct(
										${products[i].id},
										'${products[i].name}',
										'${products[i].prince}',
										'${products[i].shortDes}',
										'${products[i].active}'
									)">Sửa</button>

								<button type="button" class="btn btn-primary mr-2"
									data-toggle="modal" data-target="#deleteProductModal"
									class="btn-primary btn"
									onclick="passDataRemoveProduct(
										${products[i].id},
										'${products[i].name}',
										)">xóa</button>
							</td>

						</tr>
		`;
	}

	
	$('#tproductbody').html(productData);

	var pagination;
	if(search == true ){
		pagination = `				
		<li class="page-item"><a class="page-link" href="#" onclick="getSearchProducts(${pageNumberIndex},${5}, '${this.productname}', '${this.active}', '${this.priceFrom}', '${this.priceTo}'), activeNumber(${pageNumberIndex-1})">Previous</a></li>
		`;
	}
	else{
		pagination = `				
		<li class="page-item"><a class="page-link" href="#" onclick="getProductsByPage(${pageNumberIndex},${5}), activeNumber(${pageNumberIndex-1})">Previous</a></li>
		`;
	}
	// let totalusers = search == true ? await getAllUsersSearch() : await getUsers();
	// console.log('totalpage'+Math.ceil(totalusers.length/5)+totalusers.length)
	let totalProducts = (search == true) ? await getAllProductsSearch() :await getAllProducts();
	console.log('totalpage '+ totalProducts.length)
	for (var i = 0; i < Math.ceil(totalProducts.length/5) ; i++){
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
				<li class="page-item" active><a class="page-link" href="#" onclick="getSearchProducts(${i+1},${5}, '${this.productname}', '${this.active}', '${this.priceFrom}', '${this.priceTo}'), activeNumber(${i})">${i+1}</a></li>
				`;
			} 
			else{
				pagination += `				
				<li class="page-item" active><a class="page-link" href="#" onclick="getProductsByPage(${i+1},${5}), activeNumber(${i})">${i+1}</a></li>
				`;
			}
		}
		
		
	}
	if(search == true ){
		pagination += `				
		<li class="page-item"><a class="page-link" href="#" onclick="getSearchProducts(${pageNumberIndex+2 <= Math.ceil(totalProducts.length/5) ? pageNumberIndex+2:Math.ceil(totalProducts.length/5)},${5}, '${this.productname}', '${this.active}', '${this.priceFrom}', '${this.priceTo}'), activeNumber(${pageNumberIndex+1 <= Math.ceil(totalProducts.length/5)-1 ? pageNumberIndex+1 :pageNumberIndex})">Next</a></li>
		`;
	}
	else{
		pagination += `				
		<li class="page-item"><a class="page-link" href="#" onclick="getProductsByPage(${pageNumberIndex+2 <= Math.ceil(totalProducts.length/5) ? pageNumberIndex+2:Math.ceil(totalProducts.length/5)  },${5}), activeNumber(${pageNumberIndex+1 <= Math.ceil(totalProducts.length/5)-1 ? pageNumberIndex+1 :pageNumberIndex})">Next</a></li>
		`;
	}

	$('#listproduct-pagination').html(pagination);

	var headtb;
	headtb = `
	<p class="font-monospace ml-2 font-weight-bold">hiển thị ${pageNumberIndex*5+1} - ${pageNumberIndex*5+data.length} trên tổng ${totalProducts.length} user</p>
	`;
	$('#headtbproduct').html(headtb);
}

$("#btnProductSave").click(async function() {
	var name = $('#addProductModal input[name="name"]').val();
	var prince = $('#addProductModal input[name="prince"]').val();
	var description = $('#addProductModal #modalDes').val();
	var stt = $('#addProductModal select[name="stt"] option:selected').val();
	await Validation(name, prince);
	// alert(name)
	if (boolean == true) {
		$.ajax({
			url: 'insertproduct.do',
			method: 'post',
			data: 'name=' + name
				+ '&prince=' + prince
				+ '&description=' + description
				+ '&stt=' + stt,
			success: function(response) {
				if (response) {
					location.reload()
				}
				else {
					showToast('Oops!', ' Failed! :D :D :D', 0);
				}
			}
		});
		$('#addProductModal').modal('hide')
	}

});

$("#btnProductEdit").click(async function() {
	var id = $('#editProductModal input[name="id-edit"]').val();
	var name = $('#editProductModal input[name="name"]').val();
	var prince = $('#editProductModal input[name="prince"]').val();
	var description = $('#editProductModal #modaleditDes').val();
	var stt = $('#editProductModal select[name="stt"] option:selected').val();
	await Validation(name, prince);
	if (boolean == true) {
		$.ajax({
			url: 'updateproduct.do',
			method: 'post',
			data: 'name=' + name
				+ '&prince=' + prince
				+ '&description=' + description
				+ '&id=' + id
				+ '&stt=' + stt,
			success: function(response) {
				if (response) {
					if(search == true){
						location.reload();
					}else{
						getProductsByPage(pageNumberIndex+1,5)
					}
					
					// console.log(response)
				}
				else {
					showToast('Oops!', ' Failed! :D :D :D', 0);
				}
			}
		});
		$('#editProductModal').modal('hide')
	}

});

$("#btnProductRemove").click(async function() {
	var id = $('#deleteProductModal input[name="id-remove"]').val();

		$.ajax({
			url: 'deleteproduct.do',
			method: 'post',
			data: 'id=' + id,
			success: function(response) {
				if (response) {
					location.reload()
					console.log(response)
				}
				else {
					showToast('Oops!', ' Failed! :D :D :D', 0);
				}
			}
		});
		$('#deleteProductModal').modal('hide')

});

function passDataEditProduct(id, name, prince, des, stt) {
	$('#editProductModal input[name="id-edit"]').val(id);
	$('#editProductModal input[name="name"]').val(name);
	$('#editProductModal input[name="prince"]').val(prince);
	$('#editProductModal #modaleditDes').val(des);
	$('#editProductModal select').val(stt);
}

function passDataRemoveProduct(id, name) {
	$('#deleteProductModal input[name="id-remove"]').val(id);
	$('#deleteProductModal label').html(name);
}

// Validation add
function setError(id, data) {
	document.getElementById(id).innerHTML = data;
}

async function Validation(name, prince) {
	// var name = $('#addProductModal input[name="name"]').val();
	// var prince = $('#addProductModal input[name="prince"]').val();
	// var description = $('#addProductModal #modalDes').val();
	// var stt = $('#addProductModal select[name="stt"] option:selected').val();
	boolean = true;

	// validate name

	if (name.length <= 0) {
		setError("errorProductName", 'Tên không được để trống');
		boolean = false;
	}
	else {
		setError("errorProductName", '');
	}

	//prince

	if(prince <= 0 || prince.length < 0 ){
		setError("errorProductPrince", 'giá phải lớn hơn 0');
		boolean = false;
	}
	else {
		setError("errorProductPrince", '');
	}

	return boolean;
}

// logout
function logout() {
	window.location.href = '/logout.do';
}

function resetForm() {
	pageNumberIndex = 0;
	$('#searchProductForm').trigger('reset');
	search = false;
	console.log(search);
	getProductsByPage(1,5);
	// getUsers();
}