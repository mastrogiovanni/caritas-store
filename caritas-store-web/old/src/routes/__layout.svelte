<script context="module">
	export async function load({ session, url }) {
		const { user } = session;
		if (!user && url.pathname !== '/login') {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {};
	}
</script>

<div class="container">
	<div class="row">
		<div class="col">
			<slot />
		</div>
	</div>
</div>
