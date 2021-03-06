import styles from '@styles/Home.module.scss';
import Container from '@components/container';
import { AppDispatch } from '@app/store';
import { changeTheme, getTheme, ThemeEnum } from '@features/themeSlice';
import { connect } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { GoNextButton, StepIndicator } from '@components';
import { useRouter } from 'next/router';
import { initAll } from '@features/testSlice';

type Props = StateProps & DispatchProps;

const Home = ({ onChangeTheme, onInitAll }: Props) => {
	const router = useRouter();

	const goNext = async () => {
		await router.push('/theme');
	};

	useEffect(() => {
		onChangeTheme(ThemeEnum.Default);
		onInitAll();
	}, []);

	return (
		<Fragment>
			<Container>
				<StepIndicator step={0} />
				<h1 className={styles.emoji}>π§</h1>
				<h1 className={styles.title}>
					<strong className={styles.darkMode}>λ€ν¬λͺ¨λ</strong> VS{' '}
					<strong className={styles.lightMode}>λΌμ΄νΈλͺ¨λ</strong>
				</h1>
				<h3 className={styles.description}>
					2λ²μ νμ€νΈλ‘ λνν λ§λ λͺ¨λλ₯Ό νμΈνμΈμ!
				</h3>
				<GoNextButton goNext={goNext} body={'μμ'} />
			</Container>
		</Fragment>
	);
};

interface StateProps {
	theme: ThemeEnum;
}

const mapStateToProps = (state: RootState): StateProps => ({
	theme: getTheme(state),
});

interface DispatchProps {
	onChangeTheme: (themeEnum: ThemeEnum) => void;
	onInitAll: () => void;
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
	onChangeTheme: (themeEnum: ThemeEnum) => dispatch(changeTheme(themeEnum)),
	onInitAll: () => dispatch(initAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
