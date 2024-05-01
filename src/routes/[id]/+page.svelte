<script lang="ts">
	import user_img from '$lib/images/user.png';
	import type { PageData } from './$types';

	/** @type {import('./$types').PageData}  */
	export let data: PageData;
</script>

<section class="w-full max-w-[400px] mx-auto flex flex-col gap-8 py-6">
	{#if data?.records && data?.records?.length}
		<div class="flex flex-col items-center gap-4 bg-blue-50 p-4 rounded-lg">
			<picture>
				<source srcset={user_img} />
				<img class="w-24" src={user_img} alt="" />
			</picture>
			<p class="font-medium">{data?.records[0].fields.Name}</p>
		</div>
		<div class="flex justify-between bg-blue-200 p-6 rounded-lg">
			<div class="flex flex-col gap-2">
				<p class="w-full text-center font-medium text-gray-500 text-sm">ID</p>
				<p class="w-full text-center text-lg font-bold">{data?.records[0].fields.ID}</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="w-full text-center font-medium text-gray-500 text-sm">Marks</p>
				<p class="w-full text-center text-lg font-bold">
					{data?.records[0].fields.Marks}/{data?.records[0].fields['Max Marks']}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="w-full text-center font-medium text-gray-500 text-sm">Status</p>
				<p class="w-full text-center text-lg font-bold">{data?.records[0].fields.Status}</p>
			</div>
		</div>
		<div class="flex justify-center items-center">
			<div
				class="w-40 h-40 bg-blue-200 grid place-content-center
					place-items-center rounded-full relative before:absolute before:w-[85%] before:h-[85%]
					 before:bg-blue-500 before:rounded-full before:grid before:place-content-center"
			>
				<div class="z-50">
					<p class="font-bold text-2xl text-white">
						{((data?.records[0].fields.Marks / data?.records[0].fields['Max Marks']) * 100).toFixed(
							2
						)}%
					</p>
				</div>
			</div>
		</div>
		<h3 class="font-semibold text-lg mb-3">Your Marks</h3>
		<div class="flex flex-wrap gap-4 gap-y-10">
			<div
				class="flex-auto w-2/5 h-12 flex flex-col justify-between rounded-md bg-blue-300 relative"
			>
				<div
					class="w-14 h-10 text-white border-[3px] border-blue-300 flex justify-center items-center absolute -top-6 left-2 rounded-full bg-slate-700"
				>
					<div class="text-sm font-semibold">{data?.records[0].fields['Hardware'] ?? '-'}</div>
				</div>
				<div class="absolute bottom-3 left-16 font-bold">Hardware</div>
			</div>
			<div
				class="flex-auto w-2/5 h-12 flex flex-col justify-between rounded-md bg-blue-300 relative"
			>
				<div
					class="w-14 h-10 text-white border-[3px] border-blue-300 flex justify-center items-center absolute -top-6 left-2 rounded-full bg-slate-700"
				>
					<div class="text-sm font-semibold">{data?.records[0].fields['Multimedia'] ?? '-'}</div>
				</div>
				<div class="absolute bottom-3 left-16 font-bold">Multimedia</div>
			</div>
			<div
				class="flex-auto w-2/5 h-12 flex flex-col justify-between rounded-md bg-blue-300 relative"
			>
				<div
					class="w-14 h-10 text-white border-[3px] border-blue-300 flex justify-center items-center absolute -top-6 left-2 rounded-full bg-slate-700"
				>
					<div class="text-sm font-semibold">{data?.records[0].fields['Network'] ?? '-'}</div>
				</div>
				<div class="absolute bottom-3 left-16 font-bold">Network</div>
			</div>
			<div
				class="flex-auto w-2/5 h-12 flex flex-col justify-between rounded-md bg-blue-300 relative"
			>
				<div
					class="w-14 h-10 text-white border-[3px] border-blue-300 flex justify-center items-center absolute -top-6 left-2 rounded-full bg-slate-700"
				>
					<div class="text-sm font-semibold">{data?.records[0].fields['Web Design'] ?? '-'}</div>
				</div>
				<div class="absolute bottom-3 left-16 font-bold">Web Design</div>
			</div>
			<div
				class="flex-auto w-2/5 h-12 flex flex-col justify-between rounded-md bg-blue-300 relative"
			>
				<div
					class="w-14 h-10 text-white border-[3px] border-blue-300 flex justify-center items-center absolute -top-6 left-2 rounded-full bg-slate-700"
				>
					<div class="text-sm font-semibold">{data?.records[0].fields['Database'] ?? '-'}</div>
				</div>
				<div class="absolute bottom-3 left-16 font-bold">Database</div>
			</div>
		</div>
		<div class="flex flex-wrap justify-center gap-4 items-center">
			<b class="w-full text-center">Grade Keys</b>
			<div class="flex items-center gap-3">
				<div class="w-4 h-4 rounded-full bg-green-500" />
				<span>A</span>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-4 h-4 rounded-full bg-yellow-300" />
				<span>B</span>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-4 h-4 rounded-full bg-amber-500" />
				<span>C</span>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-4 h-4 rounded-full bg-red-500" />
				<span>D</span>
			</div>
		</div>
	{:else}
		<p>Sorry could not found!</p>
	{/if}
</section>
