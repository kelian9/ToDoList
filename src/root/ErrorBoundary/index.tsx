import React from 'react';

class ErrorBoundary extends React.Component<any, { error: any; hasError: boolean }> {
	constructor(props: any) {
		super(props);
		this.state = { error: null, hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { error: error, hasError: true };
	}

	render() {
		const { error, hasError } = this.state;
		const { children } = this.props;
		if (hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return (
				<div className='error-boundary-view'>
					<h1>Что-то пошло не так.</h1>
					{error.toString()}
				</div>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
