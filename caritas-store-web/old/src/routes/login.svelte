<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { login } from './protected/libs/apis.users';

	let username;
	let password;

	async function _login() {
		const res = await login(username, password);
		if (res) {
			$session = {
				user: res.name,
				role: username === 'admin' ? 'admin' : 'user',
				id: res._id
			};
			window.localStorage.setItem('login', JSON.stringify(res));
			goto('/protected');
		}
	}

	onMount(() => {
		const savedUsername = window.localStorage.getItem('login');
		if (savedUsername) {
			const res = JSON.parse(savedUsername);
			username = res.username;
			password = res.password;
			_login();
		}
	});
</script>

<section class="vh-100">
	<div class="container py-5 h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
				<div class="card shadow-2-strong" style="border-radius: 1rem;">
					<div class="card-body p-5 text-center">
						<h3 class="mb-5">Sign in</h3>

						<div class="form-outline mb-4">
							<input bind:value={username} type="text" id="typeEmailX-2" class="form-control form-control-lg" />
							<label class="form-label" for="typeEmailX-2">Username</label>
						</div>

						<div class="form-outline mb-4">
							<input bind:value={password} type="password" id="typePasswordX-2" class="form-control form-control-lg" />
							<label class="form-label" for="typePasswordX-2">Password</label>
						</div>

						<!-- Checkbox -->
						<!--
			  <div class="form-check d-flex justify-content-start mb-4">
				<input
				  class="form-check-input"
				  type="checkbox"
				  value=""
				  id="form1Example3"
				/>
				<label class="form-check-label" for="form1Example3"> Remember password </label>
			  </div>
				-->

						<button on:click={_login} class="btn btn-primary btn-lg btn-block" type="submit">Login</button>

						<!--
			  <hr class="my-4">
  
			  <button class="btn btn-lg btn-block btn-primary" style="background-color: #dd4b39;" type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button>
			  <button class="btn btn-lg btn-block btn-primary mb-2" style="background-color: #3b5998;" type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button>
			  -->
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!--
	  
<section class="h-100 gradient-form" style="background-color: #eee;">
	<div class="container py-5 h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-xl-10">
				<div class="card rounded-3 text-black">
					<div class="row g-0">
						<div class="col-lg-6">
							<div class="card-body p-md-5 mx-md-4">
								<div class="text-center">
									<img
										src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
										style="width: 185px;"
										alt="logo"
									/>
									<h4 class="mt-1 mb-5 pb-1">Caritas</h4>
								</div>

								<form>
									<p>Please login to your account</p>

									<div class="form-outline mb-4">
										<input
											bind:value={username}
											type="email"
											id="form2Example11"
											class="form-control"
											placeholder="Phone number or email address"
										/>
										<label class="form-label" for="form2Example11">Username</label>
									</div>

									<div class="form-outline mb-4">
										<input
											bind:value={password}
											type="password"
											id="form2Example22"
											class="form-control"
										/>
										<label class="form-label" for="form2Example22">Password</label>
									</div>

									<div class="text-center pt-1 mb-5 pb-1">
										<button
											on:click={_login}
											class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
											type="button">Log in</button
										>
										<a class="text-muted" href="#!">Forgot password?</a>
									</div>

									<div class="d-flex align-items-center justify-content-center pb-4">
										<p class="mb-0 me-2">Don't have an account?</p>
										<button type="button" class="btn btn-outline-danger">Create new</button>
									</div>
								</form>
							</div>
						</div>
						<div class="col-lg-6 d-flex align-items-center gradient-custom-2">
							<div class="text-white px-3 py-4 p-md-5 mx-md-4">
								<h4 class="mb-4">We are more than just a company</h4>
								<p class="small mb-0">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.gradient-custom-2 {
		/* fallback for old browsers */
		background: #fccb90;

		/* Chrome 10-25, Safari 5.1-6 */
		background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
	}

	@media (min-width: 768px) {
		.gradient-form {
			height: 100vh !important;
		}
	}
	@media (min-width: 769px) {
		.gradient-custom-2 {
			border-top-right-radius: 0.3rem;
			border-bottom-right-radius: 0.3rem;
		}
	}
</style>
-->
