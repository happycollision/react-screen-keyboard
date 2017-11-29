import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

let allowOnly = 0;

export default class KeyboardButton extends PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
		classes: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		autofocus: PropTypes.bool,
		isDisabled: PropTypes.bool,
	};

	static defaultProps = {
		classes: '',
		autofocus: false,
		isDisabled: false,
	};

	handleValidInput = () => {
		console.log('valid input detected');
		if (!this.props.isDisabled) {
			this.props.onClick(this.props.value)
		}
	}

	handleClickAttempt(e) {
		console.log('click attempted');
		if (allowOnly === 2) return;
		if (allowOnly === 0) allowOnly = 1;
		if (allowOnly === 1) this.handleValidInput();
	}

	handleTouchAttempt(e) {
		console.log('touch attempted');
		if (allowOnly === 1) return;
		if (allowOnly === 0) allowOnly = 2;
		if (allowOnly === 2) this.handleValidInput();
	}

	render() {
		return (
			<button
				type="button"
				className={`keyboard-button ${this.props.classes}`}
				onMouseUp={this.handleClickAttempt}
				onTouchStart={this.handleTouchAttempt}
				autoFocus={this.props.autofocus}
				disabled={this.props.isDisabled}
			>
				{this.props.value}
			</button>
		);
	}
}
