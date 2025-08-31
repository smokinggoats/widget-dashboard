<script lang="ts">
	import { onMount } from 'svelte';
	import { getWeatherLocation, type Weather } from '.';
	let weather = $state<[string, Weather][]>([]);
	let location = $state<[number, number]>([0, 0]);
	let isLoading = $state(false);
	onMount(async () => {
		await onButtonClick();
	});
	async function onButtonClick() {
		try {
			isLoading = true;
			const r = await getWeatherLocation();
			weather = r.weather;
			location = r.location;
		} catch (error) {
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="weather">
	{#each weather as [date, w], idx}
		<div class="weather__date">
			<div class="weather__date__title">{date}</div>
			<div class="weather__date__text">
				<div>
					<span class="label">AMIN:</span>{' '}
					{w.apparent_temperature_min}{' '}<span class="label">°C</span>
				</div>
				<hr />
				<div>
					<span class="label">AMAX:</span>{' '}
					{w.apparent_temperature_max}{' '}<span class="label">°C</span>
				</div>
			</div>
			<div class="weather__date__text">
				<div>
					<span class="label">MIN:</span>{' '}
					{w.temperature_2m_min}{' '}<span class="label">°C</span>
				</div>
				<hr />
				<div>
					<span class="label">MAX:</span>{' '}
					{w.temperature_2m_max}{' '}<span class="label">°C</span>
				</div>
			</div>
			<div class="weather__date__text">
				<div>
					<span class="label">PPM:</span>{' '}
					{w.precipitation_probability_max}{' '}<span class="label">%</span>
				</div>
			</div>
			<div class="weather__date__text">
				<div>
					<span class="label">S5E:</span>{' '}
					{w.sunrise?.replace(':', 'h')}
				</div>
				<hr />
				<div>
					<span class="label">S4T:</span>{' '}
					{w.sunset?.replace(':', 'h')}
				</div>
			</div>
		</div>
	{/each}
	<div class="weather__date weather__date--footer">
		<button type="button" onclick={onButtonClick} title="Refresh">⟳</button>
		{#if isLoading}
			<div class="weather__date__loading">⭮</div>
		{:else}
			<div class="weather__date__text">
				<div>
					{location[0]?.toFixed(2)} <span class="label">LAT</span> | {location[1]?.toFixed(2)}
					<span class="label">LNG</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	:root {
		--table-size: 90vw;
	}

	@media (min-width: 40em) {
		:root {
			--table-size: 50vw;
		}
	}
	.weather {
		width: var(--clock-size);
		background-color: #333;
		border-width: 0.2rem;
		border-style: double;
		border-color: rgba(128, 0, 128, 0.8);
		box-sizing: border-box;
		color: #fff;
		position: relative;
		max-height: 65vh;
		overflow-y: auto;
		overflow-x: hidden;
		&__date {
			&:nth-child(2n-1) {
				background: linear-gradient(to top, rgba(128, 0, 128, 0.1), #300030);
			}
			&:nth-child(2n) {
				background: linear-gradient(to top, #300030, rgba(128, 0, 128, 0.1));
			}
			&:last-child {
				background: linear-gradient(to top, rgb(150, 0, 150), #300030);
			}
			transition: all 2s ease;
			background-color: #333;
			border-color: rgba(128, 0, 128, 0.8);
			border-top-width: 0.1rem;
			border-bottom-width: 0.1rem;
			margin: 0;
			padding: 1rem 4rem;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			&--footer {
				z-index: 10;
				position: sticky;
				background: #300030;
				border-style: double;
				border-width: 0.1rem;
				bottom: 0rem;
				left: -0.2rem;
				width: calc(100% + 0.4rem);
				height: 1.6rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				button {
					cursor: pointer;
				}
			}
			&__loading {
				animation: rotateIcon 1s infinite linear;
				width: 1rem;
				height: 1rem;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				@keyframes rotateIcon {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			}
			&__title {
				font-size: 1rem;
				text-align: center;
				font-weight: 200;
				box-shadow: 0 0 10px 0px purple;
				padding: 0.2rem 1rem;
				border-radius: 10rem;
				margin: auto;
				margin-bottom: 2rem;
			}
			&__text {
				font-size: 0.8rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				hr {
					flex-grow: 1;
					max-width: 10rem;
					border-color: darkviolet;
					opacity: 0.7;
				}
				div {
					flex-shrink: 1;
					// width: 50%;
					.label {
						font-size: 0.6rem;
						font-weight: 300;
					}
					&:nth-child(2n) {
						text-align: right;
					}
				}
			}
		}
	}
</style>
