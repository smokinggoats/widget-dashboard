import { fetchWeatherApi } from 'openmeteo';
export const ssr = false;
export type Weather = {
	date: string;
	lat: number;
	lng: number;
	sunrise?: string;
	sunset?: string;
	temperature_2m_max?: string;
	temperature_2m_min?: string;
	apparent_temperature_min?: string;
	apparent_temperature_max?: string;
	precipitation_probability_max?: string;
	precipitation_sum?: string;
	showers_sum?: string;
	rain_sum?: string;
	snowfall_sum?: string;
};

export async function getWeather(location: [number, number]): Promise<{
	weather: [string, Weather][];
	location: [number, number];
}> {
	const params = {
		latitude: location[0],
		longitude: location[1],
		daily: [
			'weather_code',
			'sunrise',
			'temperature_2m_max',
			'temperature_2m_min',
			'sunset',
			'apparent_temperature_min',
			'apparent_temperature_max',
			'precipitation_probability_max',
			'precipitation_sum',
			'showers_sum',
			'rain_sum',
			'snowfall_sum'
		],
		past_days: 0,
		forecast_days: 5
	};
	try {
		const url = 'https://api.open-meteo.com/v1/forecast';
		const responses = await fetchWeatherApi(url, params);
		const r = responses[0];
		const utcOffsetSeconds = r.utcOffsetSeconds();
		const daily = r.daily();
		if (daily) {
			const sunrise = daily.variables(1)!;
			const sunset = daily.variables(4)!;
			const weatherData = {
				daily: {
					time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
						(_, i) =>
							new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
					),
					weather_code: daily.variables(0)!.valuesArray() || [],
					sunrise: [...Array(sunrise.valuesInt64Length())].map(
						(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
					),
					temperature_2m_max: daily.variables(2)!.valuesArray() || [],
					temperature_2m_min: daily.variables(3)!.valuesArray() || [],
					sunset: [...Array(sunset.valuesInt64Length())].map(
						(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
					),
					apparent_temperature_min: daily.variables(5)!.valuesArray() || [],
					apparent_temperature_max: daily.variables(6)!.valuesArray() || [],
					precipitation_probability_max: daily.variables(7)!.valuesArray() || [],
					precipitation_sum: daily.variables(8)!.valuesArray() || [],
					showers_sum: daily.variables(9)!.valuesArray() || [],
					rain_sum: daily.variables(10)!.valuesArray() || [],
					snowfall_sum: daily.variables(11)!.valuesArray() || []
				}
			};

			const response = weatherData.daily.time
				.map((date, index) => {
					const d = date.toISOString();
					const dateRgx = /(\d{4}-\d{2}-\d{2})/i;
					const timeRgx = /T(\d{2}:\d{2})/i;
					return [
						dateRgx.exec(d)?.[1] || d,
						{
							lat: location[0],
							lng: location[1],
							date: d,
							sunrise: timeRgx.exec(weatherData.daily.sunrise[index]?.toISOString())?.[1],
							sunset: timeRgx.exec(weatherData.daily.sunset[index]?.toISOString())?.[1],
							temperature_2m_max: weatherData.daily.temperature_2m_max[index]?.toFixed(2),
							temperature_2m_min: weatherData.daily.temperature_2m_min[index]?.toFixed(2),
							apparent_temperature_min:
								weatherData.daily.apparent_temperature_min[index]?.toFixed(2),
							apparent_temperature_max:
								weatherData.daily.apparent_temperature_max[index]?.toFixed(2),
							precipitation_probability_max:
								weatherData.daily.precipitation_probability_max[index]?.toFixed(2),
							precipitation_sum: weatherData.daily.precipitation_sum[index]?.toFixed(2),
							showers_sum: weatherData.daily.showers_sum[index]?.toFixed(2),
							rain_sum: weatherData.daily.rain_sum[index]?.toFixed(2),
							snowfall_sum: weatherData.daily.snowfall_sum[index]?.toFixed(2)
						}
					] as [string, Weather];
				})
				.filter((e) => !!e);
			return { weather: response, location };
		} else {
			return { weather: [], location: [-23.5475, -46.6361] };
		}
	} catch (error: any) {
		alert(error?.message);
		return { weather: [], location: [-23.5475, -46.6361] };
	}
}

export function getWeatherLocation() {
	const p = new Promise<{ weather: [string, Weather][]; location: [number, number] }>((res) => {
		navigator.geolocation.getCurrentPosition(
			async function (l) {
				const location: [number, number] = [l.coords.latitude, l.coords.longitude];
				res(await getWeather(location));
			},
			async () => {
				window.alert('No location allowed');
				res(await getWeather([-23.5475, -46.6361]));
			}
		);
	});
	return p;
}
