import React from 'react';
import {TextField, RaisedButton} from 'material-ui'

export default class BudgetPage extends React.Component {

  save() {
    let month = this.refs.month.getValue()
    let amount = this.refs.amount.getValue()
    console.log(month+":"+amount);
    // this.props.signIn({email, password})
  }

  render() {
    return (
      <div style={{minHeight: 700}}>
        <h1>
          Budget
          <TextField fullWidth={true} id='month' ref='month' hintText='ex. 2018-05'  autoFocus={true} />
          <TextField fullWidth={true} id='amount' ref='amount' hintText='7533967' />
          <RaisedButton
            label='Save'
            primary={true}
            onTouchTap={() => this.save()}/>
        </h1>
      </div>
    )
  }
}
