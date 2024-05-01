<script lang="ts">
	// import { goto } from '$app/navigation';

	// interface Exam {
	// 	Name: string;
	// 	Time: string;
	// 	Phone: string;
	// 	Multimedia: number;
	// 	Teacher: string;
	// 	Hardware: number;
	// 	ID: number;
	// 	Result: number;
	// }

	// interface Data {
	// 	records: {
	// 		id: string;
	// 		createdTime: Date;
	// 		fields: any[];
	// 	};
	// 	error?: string;
	// }

	import '../app.css';
	import logo from '$lib/images/logo.png';
	import { enhance } from '$app/forms';

	let loading = false;

	export let form;
</script>

<svelte:head>
	<title>Tisqaad College</title>
</svelte:head>

<section class="w-full max-w-[400px] mx-auto flex flex-col justify-center gap-6">
	<picture>
		<source srcset={logo} />
		<img class="mx-auto w-28 rounded-full" src={logo} alt="" />
	</picture>
	<form
		class="space-y-2"
		method="POST"
		action="?/search"
		use:enhance={() => {
			loading = true;

			return async ({ update }) => {
				loading = false;
				update();
			};
		}}
	>
		<div class="space-y-1">
			<label class="font-medium text-gray-500 text-sm" for="id">ID No.</label>
			<input
				class="w-full p-2 px-4 border-2 rounded-sm"
				type="number"
				name="id"
				id="id"
				placeholder="ID No"
			/>
		</div>
		{#if form?.missing}
			<p class="text-red-500 text-sm font-medium">Please enter your ID correctly.</p>
		{:else if form?.notFound}
			<p class="text-red-500 text-sm font-medium">No matching ID No.</p>
		{/if}
		<button
			class={`w-full h-10 ${
				loading ? 'bg-blue-300' : 'bg-blue-700'
			} font-medium text-white rounded-sm`}
			disabled={loading}>{loading ? 'Searching...' : 'Search'}</button
		>
	</form>
</section>

<style>
	:root {
		--primary-color: #0064c8;
		--secondary-color: #90c8ff;
		--light-secondary-color: #90c8ff88;
		--accent-color: #cee6ff;
		--light-color: #deeefe;
		--min-height: 100vh;
	}
</style>
