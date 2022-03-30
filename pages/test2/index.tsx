import { Container, GoNextButton, StepIndicator } from '@components';
import { changeTheme, ThemeEnum } from '@features/themeSlice';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@app/store';
import {
	defaultTimerTime,
	getFinishedTest,
	initTest,
	TestTypeEnum,
} from '@features/testSlice';
import styles from '@styles/test.module.scss';
import { useRouter } from 'next/router';

type Props = StateProps & DispatchProps;

const Test2 = ({ finishedTest, onChangeTheme, onInitTest }: Props) => {
	const router = useRouter();

	const goNext = async () => {
		await router.push('/test2/run');
	};

	useEffect(() => {
		if (finishedTest) {
			onChangeTheme(ThemeEnum.Usually);
			finishedTest === 1 && onInitTest(TestTypeEnum.Timer);
		} else {
			router.replace('/redirect');
		}
	}, []);

	return (
		<Container>
			<StepIndicator step={3} />
			<h1 className={styles.emoji}>😉</h1>
			<h2 className={styles.description}>
				이번에는{' '}
				<strong className={styles.questionText__strong}>
					{defaultTimerTime}초
				</strong>{' '}
				안에 일치하는 단어들을 모두 골라주세요!
			</h2>
			<p className={styles.description}>
				이번 테스트가 마지막이에요! 힘내주세요
			</p>
			<GoNextButton goNext={goNext} body={'시작할게요!'} />
		</Container>
	);
};

interface StateProps {
	finishedTest: number;
}

const mapStateToProps = (state: RootState) => ({
	finishedTest: getFinishedTest(state),
});

interface DispatchProps {
	onChangeTheme: (theme: ThemeEnum) => void;
	onInitTest: (testType?: TestTypeEnum) => void;
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
	onChangeTheme: (theme: ThemeEnum) => dispatch(changeTheme(theme)),
	onInitTest: (testType?: TestTypeEnum) => dispatch(initTest(testType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test2);
