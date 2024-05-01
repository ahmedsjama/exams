<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';

	/** @type {import('./$types').PageData}*/
	export let data: PageData;
	/** @type {import('./$types').ActionData}*/
	export let form: ActionData;

	let loading = false;
</script>

<section class="flex-1 flex flex-col justify-center items-center">
	<div class="w-full max-w-[400px] p-4 border-2 rounded-md flex flex-col gap-4">
		<h3 class="font-semibold text-lg">Verify it&apos;s you</h3>
		<form
			method="POST"
			action="?/verify"
			class="space-y-2"
			use:enhance={() => {
				loading = true;

				return async ({ update }) => {
					loading = false;
					update();
				};
			}}
		>
			<label class="text-sm font-medium text-gray-500" for="PIN">PIN No.</label>
			<input
				class="w-full p-2 px-4 border-2 rounded-sm"
				placeholder="PIN No."
				type="number"
				id="PIN"
				name="PIN"
			/>
			<input type="hidden" name="ID" value={data.id} />
			{#if form?.error}
				<p>{form?.error}</p>
			{/if}
			<button
				class={`w-full h-10 ${
					loading ? 'bg-blue-300' : 'bg-blue-700'
				} font-medium text-white rounded-sm`}
				disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button
			>
		</form>
	</div>
</section>
