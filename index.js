const tabs = document.querySelectorAll("canvas");
const PAVG = document.querySelectorAll("#AVG");
const MSG = document.querySelectorAll("#MSG");

Setup(
	tabs[0],
	[5, 10, 15, 12, 10, 13, 18],
	"Kg",
	PAVG[0],
	MSG[0],
	["Be patient, the day will arrive 😴", "Time to go 🚗"],
	40
);
Setup(tabs[1], [28, 32, 30, 30, 29, 34, 30], "°C", PAVG[1], MSG[1], [
	"The temperature and cold 🥶",
	"Temperature and normal 👌",
	"The temperature and hot 🥵",
	28,
]);
Setup(
	tabs[2],
	[52.3, 52.3, 52.3, 52.3, 52.3, 52.3, 52.3],
	"%",
	PAVG[2],
	MSG[2],
	[
		"Humidity and low 👇",
		"The humidity is normal 👌",
		"The humidity is high 📈",
	],
	52.5
);
Setup(
	tabs[3],
	[800000, 800000, 800000, 800000, 800000, 800000, 800000],
	" passages",
	PAVG[3],
	MSG[3],
	[
		"The number of bee passages and low 📉",
		"The number of bee passages is normal 👌",
		"The number of bee passages and high📈",
	],
	8000000
);

function Setup(
	element,
	datas,
	name,
	AVGtxt,
	MSGtxt,
	MSGPosibleMessage,
	baseValue
) {
	let avg = 0;
	for (let i of datas) {
		avg = avg + i;
	}
	avg = avg / datas.length;
	if (MSGPosibleMessage.length == 2) {
		let min = baseValue - baseValue * 0.2;
		if (min >= avg) {
			MSGtxt.innerText = MSGPosibleMessage[0];
		} else {
			MSGtxt.innerText = MSGPosibleMessage[1];
		}
	} else {
		let min = baseValue - baseValue * 0.2;
		let max = baseValue + baseValue * 0.2;

		if (avg >= max) {
			MSGtxt.innerText = MSGPosibleMessage[2];
		} else {
			if (avg <= min) {
				MSGtxt.innerText = MSGPosibleMessage[0];
			} else {
				MSGtxt.innerText = MSGPosibleMessage[1];
			}
		}
	}

	AVGtxt.innerText = `AVG : ${Math.floor(avg)}${name}`;
	new Chart(element, {
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
