<script lang="ts">
	import Clock from '$lib/components/clockDome/index.svelte';
	import WeatherCard from '$lib/components/weatheCard/index.svelte';
	import type { PageProps } from './$types';
</script>

<div class="page">
	<Clock />
	<WeatherCard />
</div>
