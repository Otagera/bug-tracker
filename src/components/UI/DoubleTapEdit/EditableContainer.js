import React from 'react';
//import settings from '../settings.js'
import Field from './FieldStyle';

export default class EditableContainer extends React.Component {
  constructor (props) {
    super(props)

    // init counter
    this.count = 0

    // init state
    this.state = {
      edit: false,
      value: ''
    }
  }

  componentWillUnmount () {
    // cancel click callback
    if (this.timeout) clearTimeout(this.timeout)
  }

  handleClick (e) {
    // cancel previous callback
    if (this.timeout) clearTimeout(this.timeout)

    // increment count
    this.count++

    // schedule new callback  [timeBetweenClicks] ms after last click
    this.timeout = setTimeout(() => {
      // listen for double clicks
      if (this.count === 2) {
        // turn on edit mode
        this.setState({
          edit: true,
        })
      }

      // reset count
      this.count = 0
    }, 250) // 250 ms
    //}, settings.timeBetweenClicks) // 250 ms
  }

  handleBlur (e) {
    // handle saving here
    
    // close edit mode
    this.setState({
      edit: false,
      value: e.target.value
    });
  }
  handleEnter(e){
    if(e.code === "Enter" || e.charCode === 13 || e.which === 13){
      this.props.handleEnter(e.target.value);

      this.setState({
        edit: false,
        value: ''
      });
    }
  }

  render () {
    const {children, ...rest} = this.props
    const {edit, value} = this.state
    if (edit) {
      // edit mode
      return (
        <Field
          autoFocus
          defaultValue={value}
          onBlur={this.handleBlur.bind(this)}
          onKeyPress={this.handleEnter.bind(this)}
        />
      )
    } else {
      // view mode
      return (
        <p
          onClick={this.handleClick.bind(this)}
          {...rest}
        >
          {children}
        </p>
      )
    }
  }
}
