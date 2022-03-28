import { AppDispatch } from '@app/store';
import { connect } from 'react-redux';
import { changeTheme, getTheme, ThemeEnum } from '@features/themeSlice';
import React, { useEffect } from 'react';
import styles from '@styles/survey.module.scss';
import { Container, GoNextButton } from '@components/index';
import { useRouter } from 'next/router';
import { setUsuallyMode } from '@features/surveySlice';

type Props = StateProps & DispatchProps;

const Theme = ({ theme, onChangeTheme, onSetUsuallyMode }: Props) => {
	const router = useRouter();
	const getCellClassName = (mode: ThemeEnum.Dark | ThemeEnum.Light) => {
		if (mode === theme) {
			if (mode == ThemeEnum.Dark) return styles.modeCell__dark__selected;
			else return styles.modeCell__light__selected;
		} else {
			if (mode == ThemeEnum.Dark) return styles.modeCell__dark;
			else return styles.modeCell__light;
		}
	};

	useEffect(() => {
		onChangeTheme(ThemeEnum.Current);
	}, []);

	const goNext = async () => {
		onSetUsuallyMode(theme);
		await router.push('/test1');
	};

	return (
		<Container>
			<h1 className={styles.modeSelect__question}>
				주로 어떤 모드를 이용하시나요?
			</h1>
			<div className={styles.modeSelect}>
				<div
					className={getCellClassName(ThemeEnum.Dark)}
					onClick={() => onChangeTheme(ThemeEnum.Dark)}
				>
					다크모드
				</div>
				<div
					className={getCellClassName(ThemeEnum.Light)}
					onClick={() => onChangeTheme(ThemeEnum.Light)}
				>
					라이트모드
				</div>
			</div>
			<GoNextButton goNext={goNext} />
		</Container>
	);
};

interface StateProps {
	theme: ThemeEnum.Dark | ThemeEnum.Light;
}

const mapStateToProps = (state: RootState) => ({
	theme: getTheme(state),
});

interface DispatchProps {
	onChangeTheme: (theme: ThemeEnum) => void;
	onSetUsuallyMode: (theme: ThemeEnum.Dark | ThemeEnum.Light) => void;
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
	onChangeTheme: (theme: ThemeEnum) => dispatch(changeTheme(theme)),
	onSetUsuallyMode: (theme: ThemeEnum.Dark | ThemeEnum.Light) =>
		dispatch(setUsuallyMode(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
