<script lang="ts">
	const NUMBE_MAP = [
		[1, 1, 1, 1, 1, 1, 0], //0
		[0, 0, 1, 1, 0, 0, 0], //1
		[0, 1, 1, 0, 1, 1, 1], //2
		[0, 1, 1, 1, 1, 0, 1], //3
		[1, 0, 1, 1, 0, 0, 1], //4
		[1, 1, 0, 1, 1, 0, 1], //5
		[1, 1, 0, 1, 1, 1, 1], //6
		[1, 1, 1, 1, 0, 0, 0], //7
		[1, 1, 1, 1, 1, 1, 1], //8
		[1, 1, 1, 1, 1, 0, 1] //9
	];
	const { value } = $props();
	const mapping = $derived(NUMBE_MAP[value || 0]);
</script>

<div class="segment">
	{#each mapping as sv, idx}
		<div class="segment__s segment__s segment__s--s{idx}">
			<span class="segment__s__fill {sv ? '' : 'segment__s__fill--off'}"></span>
		</div>
	{/each}
</div>

<style lang="scss">
	:root {
		--sh: 100%;
		--sw: 100%;
		--segW: 0.5rem;
		--segH: calc(var(--sh) / 2);
	}
	.segment {
		position: relative;
		height: var(--sh);
		width: var(--sw);
		box-sizing: border-box;
		margin: 0.5rem;
		&__s {
			background-origin: border-box;
			top: 0;
			left: 0;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			&__fill {
				background-color: darkviolet;
				height: 70%;
				width: 70%;
				margin: auto;
				box-sizing: border-box;
				display: block;
				opacity: 1;
				transition: all 0.5s ease;
				border-width: 0.1rem;
				border-color: #333;
				box-shadow: 0 0 10px 0px purple;
				&--off {
					border-color: #000;
					background-color: rgb(128, 0, 128);
					opacity: 0.25;
				}
			}
			&--s0 {
				// background-color: blue;
				top: 0;
				left: 0;
				width: var(--segW);
				height: var(--segH);
			}
			&--s1 {
				top: 0;
				left: 0;
				width: 100%;
				height: var(--segW);
			}
			&--s2 {
				top: 0;
				left: calc(100% - var(--segW));
				width: var(--segW);
				height: var(--segH);
			}
			&--s3 {
				top: var(--segH);
				left: calc(100% - var(--segW));
				width: var(--segW);
				height: var(--segH);
			}
			&--s4 {
				top: calc(100% - var(--segW));
				width: 100%;
				left: 0;
				height: var(--segW);
			}
			&--s5 {
				top: var(--segH);
				left: 0;
				width: var(--segW);
				height: var(--segH);
			}
			&--s6 {
				top: calc(var(--segH) + (var(--segW) * -1));
				transform: translateY(calc(var(--segW) / 2));
				width: 100%;
				height: var(--segW);
			}
		}
	}
</style>
