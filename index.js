const tabs = document.querySelectorAll("canvas");
const PAVG = document.querySelectorAll("#AVG");
const MSG = document.querySelectorAll("#MSG");
const Emoji = document.querySelectorAll("#Emoji");
const h3 = document.querySelectorAll("h3");
const section = document.querySelectorAll("section > div");
const sectionH2 = document.querySelectorAll("section > div > h2");
const ColorPallet = [
	"bg-yellow-200",
	"bg-yellow-600",
	"bg-lime-200",
	"bg-lime-700",
	"bg-orange-300",
	"bg-orange-600",
];

run();

async function run() {
	let live = await fetchs("http://10.69.0.140:3000/live");
	let hisoty = await fetchs("http://10.69.0.140:3000/history");

	let len = hisoty.honey.length;

	Setup(
		0,
		[
			hisoty.honey[len - 7].weight,
			hisoty.honey[len - 6].weight,
			hisoty.honey[len - 5].weight,
			hisoty.honey[len - 4].weight,
			hisoty.honey[len - 3].weight,
			hisoty.honey[len - 2].weight,
			hisoty.honey[len - 1].weight,
		],
		"Kg",
		["Be patient, the day will arrive 😴", "Time to go 🚗"],
		10,
		live.honey.weight,
		[]
	);

	len = hisoty.temperature.length;

	Setup(
		1,
		[
			hisoty.temperature[len - 7].degree,
			hisoty.temperature[len - 6].degree,
			hisoty.temperature[len - 5].degree,
			hisoty.temperature[len - 4].degree,
			hisoty.temperature[len - 3].degree,
			hisoty.temperature[len - 2].degree,
			hisoty.temperature[len - 1].degree,
		],
		"°C",
		[
			"The temperature is cold",
			"Temperature is normal",
			"The temperature is hot",
		],
		35,
		live.temperature.degree,
		["🥶", "👌", "🥵"]
	);

	len = hisoty.humidity.length;

	Setup(
		2,
		[
			hisoty.humidity[len - 7].percentage,
			hisoty.humidity[len - 6].percentage,
			hisoty.humidity[len - 5].percentage,
			hisoty.humidity[len - 4].percentage,
			hisoty.humidity[len - 3].percentage,
			hisoty.humidity[len - 2].percentage,
			hisoty.humidity[len - 1].percentage,
		],
		"%",
		["Humidity is low", "The humidity is normal", "The humidity is high"],
		18.5,
		live.humidity.percentage,
		["👇", "👌", "📈"]
	);

	len = hisoty.flow.length;

	Setup(
		3,
		[
			hisoty.flow[len - 7].count,
			hisoty.flow[len - 6].count,
			hisoty.flow[len - 5].count,
			hisoty.flow[len - 4].count,
			hisoty.flow[len - 3].count,
			hisoty.flow[len - 2].count,
			hisoty.flow[len - 1].count,
		],
		" passages",
		[
			"The number of bee passages is low",
			"The number of bee passages is normal",
			"The number of bee passages is high",
		],
		0,
		live.flow.count,
		["📉", "👌", "📈"]
	);
}

async function fetchs(api) {
	let data = await fetch(api);
	return await data.json();
}

function Setup(
	idx,
	datas,
	name,
	MSGPosibleMessage,
	baseValues,
	h3value,
	Emojis
) {
	let avg = 0;
	for (let i of datas) {
		avg = avg + i;
	}
	avg = avg / datas.length;

	let baseValue = baseValues;
	if (baseValue == 0) baseValue = avg;
	if (MSGPosibleMessage.length == 2) {
		let min = baseValue - baseValue * 0.2;
		if (min >= avg) {
			MSG[idx].innerText = MSGPosibleMessage[0];
			section[idx].classList.add(ColorPallet[0]);
			sectionH2[idx].classList.add(ColorPallet[1]);
		} else {
			MSG[idx].innerText = MSGPosibleMessage[1];
			section[idx].classList.add(ColorPallet[2]);
			sectionH2[idx].classList.add(ColorPallet[3]);
		}
	} else {
		let min = baseValue - baseValue * 0.2;
		let max = baseValue + baseValue * 0.2;

		if (avg >= max) {
			MSG[idx].innerText = MSGPosibleMessage[2];
			Emoji[idx - 1].innerText = Emojis[2];
			section[idx].classList.add(ColorPallet[4]);
			sectionH2[idx].classList.add(ColorPallet[5]);
		} else {
			if (avg <= min) {
				MSG[idx].innerText = MSGPosibleMessage[0];
				Emoji[idx - 1].innerText = Emojis[0];
				section[idx].classList.add(ColorPallet[4]);
				sectionH2[idx].classList.add(ColorPallet[5]);
			} else {
				MSG[idx].innerText = MSGPosibleMessage[1];
				Emoji[idx - 1].innerText = Emojis[1];
				section[idx].classList.add(ColorPallet[2]);
				sectionH2[idx].classList.add(ColorPallet[3]);
			}
		}
	}

	h3[idx].textContent = `${h3value}${name}`;

	PAVG[idx].innerText = `AVG : ${avg.toFixed(2)}${name}`;
	new Chart(tabs[idx], {
		type: "bar",
		data: {
			labels: ["J-7", "J-6", "J-5", "J-4", "J-3", "J-2", "J-1"],
			datasets: [
				{
					label: name,
					data: datas,
					borderWidth: 1,
					fill: true,
					borderColor: "000000",
					color: "000000",
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
}
