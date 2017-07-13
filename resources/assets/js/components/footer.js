import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


export default class Footer extends Component {
    handleChange(event, value){
        console.log('change', value)
        this.props.actions.filter(value)
    }

    render(){
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                margin: 15,
                width: 'auto',
                display: 'inline-block'
            },
        };
        return(
            <MuiThemeProvider>
                <RadioButtonGroup name="shipSpeed" defaultSelected="FILTER_ALL" onChange={this.handleChange.bind(this)}>
                    <RadioButton
                        value="FILTER_ALL"
                        label="All"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="FILTER_ACTIVE"
                        label="Active"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="FILTER_DONE"
                        label="Completed"
                        style={styles.radioButton}
                    />
                </RadioButtonGroup>
            </MuiThemeProvider>
        )
    }
}