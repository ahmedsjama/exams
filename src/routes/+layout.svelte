<script lang="ts">
import '../app.css'
</script>
<div class="min-h-screen flex flex-col gap-1">
	<header />
	<main class="flex-1 flex">
		<slot />
	</main>
	<footer class="flex flex-col gap-2 py-4 text-center text-sm">
		<p>
			Developed by <a href="https://wa.link/l9lp65" class="text-blue-400">Mohamed D. Nour</a>
		</p>
		<p>Tisqaad © 2024 All rights reserved.</p>
	</footer>
</div>
