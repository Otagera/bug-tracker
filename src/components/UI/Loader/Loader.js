import React from 'react';
import { useLoading, Oval } from '@agney/react-loading';

const Loader = ( props )=>{
	const { valueText, width } = props;
	const { containerProps, indicatorEl } = useLoading({
		loading: true,
		loaderProps: {
			valueText: (valueText)? valueText: 'Loading'
		},
		indicator: <Oval width={width} />
	});
	return (
		<div {...containerProps}>
			{indicatorEl}
		</div>
	);
}
export default Loader;
/*
Audio
BallTriangle
Bars
Circles
Grid
Hearts
>Oval
Puff
Rings
SpinningCircles
>TailSpin
ThreeDots

*/
	//return (<div className={style.Loader}></div>);