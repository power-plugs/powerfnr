const { React }                 = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');

module.exports = class Settings extends React.Component {
  constructor (props) {
    super();
  }

  render () {
    return (<div>
	  <TextInput 
	  note='Current replacements (Format as Stringified JSON). Example: 
	  [[">:(","😡"],[":)","😄"],[":(","😦"]]'
	  defaultValue={JSON.stringify(this.props.getSetting("replacements", []))} 
	  required={true} 
	  onChange={(val) => {
	    this.props.updateSetting('replacements', JSON.parse(val), 1234)
	  }}
	  >
	  Code
	  </TextInput>
	  </div>);
  }
};
