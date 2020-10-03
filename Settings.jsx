const { React, getModuleByDisplayName } = require('powercord/webpack');
const { Card, Button, AsyncComponent } = require('powercord/components');
const { TextInput } = require('powercord/components/settings');
const FormTitle = AsyncComponent.from(getModuleByDisplayName('FormTitle'));

// Credit goes to Bowser and his Multitask plugin for a lot of this, I'm not good at JS! ~Kanin

module.exports = class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			original: null,
			replacement: null
		};
	}

	render() {
		return (
			<div className="fnr-settings">
				<FormTitle className="fnr-settings-header" tag="h2">New Replacement</FormTitle>
				<Card className="fnr-settings-card">
					<TextInput
						value={this.state.original}
						onChange={original => this.setState({ original })}
					>
					  Original
					</TextInput>
					<TextInput
					  value={this.state.replacement}
						onChange={replacement => this.setState({ replacement })}
					>
						Replacement
					</TextInput>
					<div className="buttons">
						{this.submitButton()}
					</div>
				</Card>
				<FormTitle className="fnr-settings-header" tag="h2">Current Replacements</FormTitle>
				{this.renderReplacementList()}
			</div>
		)
	}

	renderReplacementList () {
		return this.props.getSetting('replacements').map((replacement) => (
			<Card className="fnr-settings-card">
				<TextInput
					value={replacement.original}
				>
					Original
				</TextInput>
				<TextInput
					value={replacement.replacement}
				>
					Replacement
				</TextInput>
				<div className="buttons">
					<Button disabled>Update</Button>
					<Button className="error" onClick={() => this.removeReplacement(replacement)}>Remove</Button>
				</div>
			</Card>
		));
	}

	submitButton () {
		if (!this.state.original || !this.state.replacement) {
			return (<Button disabled>Add Replacement</Button>)
		}

		let current = []
		this.props.getSetting('replacements').forEach((obj) => current.push(obj.original))
		console.log(current)
		if (current.includes(this.state.original)) {
			return (<Button className="error" disabled>Duplicate</Button>)
		}

		return (<Button onClick={() => this.addReplacement()}>Add Replacement</Button>)
	}

	addReplacement () {
		const replacements = this.props.getSetting('replacements');
		replacements.push(this.state);
		this.setState({
			original: '',
			replacement: ''
		});
		this.props.updateSetting('replacements', replacements);
	}

	removeReplacement (replacement) {
		const newReplacements = this.props.getSetting('replacements').filter(r => r !== replacement);
		this.props.updateSetting('replacements', newReplacements);
	}

}