import { AnsResult } from '@features/testSlice';
import { ansUnit, testLength } from '@lib/testset';

interface RecommendProps {
	darkCorrectRatio: number[];
	lightCorrectRatio: number[];
	darkAverageTime: number;
	lightAverageTime: number;
	usuallyMode: string;
}

interface Test1Props {
	darkTime: number[];
	lightTime: number[];
	darkAnsResult: AnsResult[];
	lightAnsResult: AnsResult[];
}

interface Test2Props {
	darkAnsResult: AnsResult[];
	lightAnsResult: AnsResult[];
}

const getCorrectRatio = ({ darkAnsResult, lightAnsResult }: Test2Props) => {
	let darkPick = 0,
		darkCorrect = 0,
		lightPick = 0,
		lightCorrect = 0;

	for (let i = 0; i < testLength; i++) {
		darkPick += ansUnit[i] + darkAnsResult[i].notAnsButPick;
		lightPick += ansUnit[i] + lightAnsResult[i].notAnsButPick;
		darkCorrect += ansUnit[i] - darkAnsResult[i].ansButNotPick;
		lightCorrect += ansUnit[i] - lightAnsResult[i].ansButNotPick;
	}
	return [
		Math.ceil((darkCorrect / darkPick) * 100),
		Math.ceil((lightCorrect / lightPick) * 100),
	];
};

// [avgDarkTime, darkCorrectRatio, avgLightTime, lightCorrectRatio]
const getTest1Result = ({
	darkTime,
	darkAnsResult,
	lightAnsResult,
	lightTime,
}: Test1Props): [number, number, number, number] => {
	let darkTimeSum = 0,
		lightTimeSum = 0;

	const [darkCorrectRatio, lightCorrectRatio] = getCorrectRatio({
		darkAnsResult: darkAnsResult.slice(0, testLength),
		lightAnsResult: lightAnsResult.slice(0, testLength),
	});

	for (let i = 0; i < testLength; i++) {
		darkTimeSum += darkTime[i];
		lightTimeSum += lightTime[i];
	}
	return [
		Number((darkTimeSum / (1000 * testLength)).toFixed(1)),
		darkCorrectRatio,
		Number((lightTimeSum / (1000 * testLength)).toFixed(1)),
		lightCorrectRatio,
	];
};

const getTest2Result = ({ darkAnsResult, lightAnsResult }: Test2Props) => {
	return getCorrectRatio({
		darkAnsResult: darkAnsResult.slice(testLength, 2 * testLength),
		lightAnsResult: lightAnsResult.slice(testLength, 2 * testLength),
	});
};

// 가중치: 0초 -> 2, 9초 -> 1, 30초 -> 0.5 인 유리함수
const getModePoint = (correctRatio: number[], averageTime: number) => {
	const a = -90 / 11,
		b = 1890 / 121,
		c = 1 / 11;
	const weight = b / (averageTime - a) + c;
	const test1 = (weight < 0.5 ? 0.5 : weight) * correctRatio[0];
	return test1 + correctRatio[1];
};

const getRecommendMode = ({
	darkCorrectRatio,
	darkAverageTime,
	lightCorrectRatio,
	lightAverageTime,
	usuallyMode,
}: RecommendProps): string => {
	if (
		darkCorrectRatio[0] < 30 ||
		darkCorrectRatio[1] < 10 ||
		lightCorrectRatio[0] < 30 ||
		lightCorrectRatio[1] < 10 ||
		darkAverageTime >= 300 ||
		lightAverageTime >= 300
	) {
		return '';
	}

	const darkPoint = getModePoint(darkCorrectRatio, darkAverageTime);
	const lightPoint = getModePoint(lightCorrectRatio, lightAverageTime);

	if (darkPoint === lightPoint) return usuallyMode;
	else if (darkPoint > lightPoint) return 'dark';
	else return 'light';
};

export { getTest1Result, getTest2Result, getRecommendMode };
