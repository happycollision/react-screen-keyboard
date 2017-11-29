import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

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

	allowOnly = 0;

	handleValidInput = () => {
		if (!this.props.isDisabled) {
			this.props.onClick(this.props.value)
		}
	}

	handleClickAttempt(e) {
		if (this.allowOnly === 2) return;
		if (this.allowOnly === 0) this.allowOnly = 1;
		if (this.allowOnly === 1) this.handleValidInput();
	}

	handleTouchAttempt(e) {
		if (this.allowOnly === 1) return;
		if (this.allowOnly === 0) this.allowOnly = 2;
		if (this.allowOnly === 2) this.handleValidInput();
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
