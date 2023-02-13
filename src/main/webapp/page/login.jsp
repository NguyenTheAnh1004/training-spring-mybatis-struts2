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
<title>Insert title here</title>
<style>
#emailHelp, #passwordHelp {
	color: red !important;
}

.lgform {
	margin: 50px auto;
	width: 550px;
}

body {
	background-color: cadetblue;
}

.fcolor {
	background-color: white;
	width: 800px;
	margin: auto;
	box-shadow: 15px 20px #888888;
}
</style>
</head>
<body>
	<div
		class="wrapper d-flex justify-content-center flex-column align-items-center mt-5 fcolor">
		<div
			class="wrapper d-flex justify-content-center flex-column align-items-center mt-5">
			<div class="logo">
				<img src="../resources/logo.png" alt="logo" />
			</div>

			<form class="lgform" method="POST" action="login.do">
				<!-- Email input -->
				<div class="form-outline mb-4">
					<label class="form-label" for="form2Example1">Email address</label>
					<s:textfield type="email" class="form-control"
						id="exampleInputEmail1" aria-describedby="emailHelp"
						placeholder="Email" name="userBean.email" />
				</div>

				<!-- Password input -->
				<div class="form-outline mb-4">
					<label class="form-label" for="form2Example2">Password</label>
					<s:textfield type="password" class="form-control"
						id="exampleInputPassword1" placeholder="Password"
						name="userBean.password" />
				</div>

				<small class="text-danger form-text text-muted"> <s:actionerror />
					<s:fielderror />
				</small>
				<div class="form-check">
					<s:checkbox name="remember" label="Remember" />
				</div>

				<!-- Submit button -->
				<div class="d-flex justify-content-end">
					<button type="submit" class="btn btn-primary mb-4 btn-lg">Sign
						in</button>
				</div>


				<!-- Register buttons -->
				<div class="text-center">
					<p>
						Not a member? <a href="#!">Register</a>
					</p>
					<p>
						<a href="#!">Forgot password?</a>
					</p>
				</div>
			</form>
		</div>
	</div>

</body>
</html>