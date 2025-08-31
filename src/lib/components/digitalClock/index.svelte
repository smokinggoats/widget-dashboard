<script lang="ts">
	import Segment from '$lib/components/digitalClock/segment.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	const now = new SvelteDate();
	$effect(() => {
		const interval = setInterval(() => {
			now.setTime(Date.now()); // Update the SvelteDate instance
		}, 500);

		return () => {
			clearInterval(interval);
		};
	});
	const hourO = $derived(`${now.getHours()}`.padStart(2, '0').slice()[0]);
	const hour1 = $derived(`${now.getHours()}`.padStart(2, '0').slice()[1]);
	const min0 = $derived(`${now.getMinutes()}`.padStart(2, '0').slice()[0]);
	const min1 = $derived(`${now.getMinutes()}`.padStart(2, '0').slice()[1]);
	const sec0 = $derived(`${now.getSeconds()}`.padStart(2, '0').slice()[0]);
	const sec1 = $derived(`${now.getSeconds()}`.padStart(2, '0').slice()[1]);
</script>

<div class="clock__digital">
	<Segment value={hourO} />
	<Segment value={hour1} />
	<div class="clock__digital__separator"></div>
	<Segment value={min0} />
	<Segment value={min1} />
	<div class="clock__digital__separator"></div>
	<Segment value={sec0} />
	<Segment value={sec1} />
</div>

<style lang="scss">
	.clock {
		&__digital {
			display: flex;
			flex-wrap: nowrap;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-around;
			height: 32%;
			width: 80%;
			margin: 1em;
			padding: 0;
			&__separator {
				width: 2rem;
				height: 100%;
				margin: 0.5rem;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				&:after {
					border-width: 0.1rem;
					border-color: #333;
					box-shadow: 0 0 10px 0px darkviolet;
					border-width: 0.1rem;
					border-color: #333;
					box-shadow: 0 0 10px 0px darkviolet;
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: 0.5rem;
					width: 0.5rem;
					content: '';
					background-color: darkviolet;
					display: block;
				}
				&:before {
					border-width: 0.1rem;
					border-color: #333;
					box-shadow: 0 0 10px 0px darkviolet;
					position: absolute;
					top: 60%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: 0.5rem;
					width: 0.5rem;
					content: '';
					background-color: darkviolet;
					display: block;
				}
			}
		}
	}
</style>
