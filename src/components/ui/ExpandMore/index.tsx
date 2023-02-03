import React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	// disable this rule just because we need to get expand for styles of styledComponent
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	const { expand, ...other } = props;
	return <IconButton {...other} disableRipple />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginRight: '29px',
	marginTop: '12px',
	width: '21px',
	height: '21px',
	background: '#F4F4F4',
	borderRadius: '100%',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default ExpandMore;
