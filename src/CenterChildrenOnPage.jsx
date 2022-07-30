import React, {useMemo} from 'react';

const CenterChildrenOnPage = (props) => {
	const innerClass = useMemo(() => {return props.border ? "InnerCenteredContainer" : "InnerCenteredContainerWithoutBorder";}, [props]);
	return (
		<div className="OuterCenteredContainer">
			<div className={innerClass}>
				{props.children}
			</div>
		</div>
	);
}

CenterChildrenOnPage.defaultProps = {
	border: true
};

export default CenterChildrenOnPage;
