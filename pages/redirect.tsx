import { Container, GoNextButton } from '@components';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { changeTheme, ThemeEnum } from '@features/themeSlice';
import { AppDispatch } from '@app/store';
import { connect } from 'react-redux';
import Head from 'next/head';

type Props = DispatchProps;

const Redirect = ({ onChangeTheme }: Props) => {
	const router = useRouter();
	const goNext = async () => {
		await router.replace('/');
	};

	useEffect(() => {
		onChangeTheme(ThemeEnum.Usually);
	}, []);

	return (
		<Fragment>
			<Head>
				<title>다크모드 vs 라이트모드 | 리다이렉션</title>
			</Head>
			<Container>
				<h1 style={{ fontSize: '50px', marginBottom: '0' }}>😣</h1>
				<h1>정상적인 경로로 접근하지 않으셨군요...</h1>
				<GoNextButton goNext={goNext} body={'처음으로 갈게요'} />
			</Container>
		</Fragment>
	);
};

interface DispatchProps {
	onChangeTheme: (themeEnum: ThemeEnum.Usually) => void;
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
	onChangeTheme: (themeEnum: ThemeEnum.Usually) =>
		dispatch(changeTheme(themeEnum)),
});

export default connect(null, mapDispatchToProps)(Redirect);
