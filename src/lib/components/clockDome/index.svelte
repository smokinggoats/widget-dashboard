<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import DigitalClock from '$lib/components/digitalClock/index.svelte';

	const now = new SvelteDate();
	$effect(() => {
		const interval = setInterval(() => {
			now.setTime(Date.now()); // Update the SvelteDate instance
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	});
	const currentHour = $derived((now.getHours() * 180) / 24);
	const currentMinute = $derived((now.getMinutes() * 180) / 60);
	const currentSecond = $derived((now.getSeconds() * 180) / 60);
</script>

<div class="clock">
	<div class="clock__pointer clock__pointer--second" style="transform: rotate({currentSecond}deg);">
		<div class="clock__pointer__dot clock__pointer__dot--second"></div>
	</div>
	<div class="clock__pointer clock__pointer--minute" style="transform: rotate({currentMinute}deg);">
		<div class="clock__pointer__dot clock__pointer__dot--minute"></div>
	</div>
	<div class="clock__pointer clock__pointer--hour" style="transform: rotate({currentHour}deg);">
		<div class="clock__pointer__dot clock__pointer__dot--hour"></div>
	</div>
	<DigitalClock />
</div>

<style lang="scss">
	:root {
		--clock-size: 90vw;
	}

	@media (min-width: 40em) {
		:root {
			--clock-size: 50vw;
		}
	}

	@media (min-width: 60em) {
		:root {
			--clock-size: 40vw;
		}
	}

	@media (min-width: 100em) {
		:root {
			--clock-size: 30vw;
		}
	}
	@media (min-width: 120em) {
		:root {
			--clock-size: 20vw;
		}
	}

	.clock {
		background: linear-gradient(to top, #333, #300030);
		overflow: hidden;
		position: relative;
		height: calc(var(--clock-size) / 2);
		width: var(--clock-size);
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		border-bottom-width: 0.2rem;
		border-bottom-color: #331133;
		border-radius: 100vh 100vh 0 0%;
		display: flex;
		flex-wrap: nowrap;
		align-items: end;
		justify-content: space-around;
		box-sizing: border-box;
		&__pointer {
			position: absolute;
			height: 0.1rem;
			bottom: 0;
			right: 50%;
			left: 0;
			transition: all 1s ease;
			transform-origin: 100% 50%;
			box-sizing: border-box;
			&__dot {
				filter: blur(0.4rem);
				border-radius: 50%;
				height: 2rem;
				width: 2rem;
				position: absolute;
				top: 0;
				left: 0;
				border-width: 0.2rem;
				box-shadow: 0 0 20px 0px purple;
				&--hour {
					border-color: purple;
					background-color: purple;
				}
				&--minute {
					border-color: darkgoldenrod;
					background-color: darkgoldenrod;
				}
				&--second {
					border-color: darksalmon;
					background-color: darksalmon;
				}
			}

			&--hour {
				left: 6rem;
			}
			&--minute {
				left: 4rem;
			}
			&--second {
				left: 2rem;
			}
		}
	}
</style>
