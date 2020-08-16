const { React }                 = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');

module.exports = class Settings extends React.Component {
  constructor (props) {
    super();
  }

  render () {
    var dval = JSON.stringify(JSON.stringify(this.getSetting("replacements", []))).replace(/\\\"/g,'"');
    dval = dval.substring(1, dval.length - 1);
    return (<div>
	  <TextInput 
	  note='Current replacements (Format as Stringified JSON). Example: 
	  [[">:(","😡"],[":)","😄"],[":(","😦"]]'
	  defaultValue={dval} 
	  required={true} 
	  onChange={(val) => {
	    this.updateSetting('replacements', JSON.parse(val), 1234)
	  }}
	  >
	  Code
	  </TextInput>
	  </div>);
  }
};
