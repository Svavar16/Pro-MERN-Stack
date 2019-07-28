import React, { Component } from 'react'

class BorderWrap extends Component {
    render() {
        const borderedStyle = {border: '1px solid silver', padding: 6}
        return (
            <div style={borderedStyle}>{this.props.children}</div>
        )
    }
}

class IssueRow extends Component {
    render() {
        const boderStyle = {border: '1px solid silver', padding: 4};

        return (
            <tr>
                
                <td style={boderStyle}>{this.props.issue_id} </td>
                <BorderWrap>
                    <td style={boderStyle}>{this.props.children} </td>
                </BorderWrap>
            </tr>
        )
    }
}

class IssueFilter extends Component {
    render(){
        return(
            <div>
                this is a  placeholder for a table of issues.
            </div>
        )
    }
}

class IssueTable extends Component {
    render(){
        const borderedStyle = {border: '1px solid silver', padding: 6}
        return (
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <th style={borderedStyle}>Id</th>
                    <th style={borderedStyle}>Title</th>
                </thead>
                <tbody>
                    <IssueRow issue_id={1}>Error in the console when clicking add</IssueRow>
                    
                        <IssueRow issue_id={2}>Missing bottom border on panes</IssueRow>
                </tbody>
            </table>
        )
    }
}

class IssueAdd extends Component {
    render() {
        return(
            <div>
                this is a placeholder for IssueAdd.
            </div>
        )
    }
}

export default class IssueList extends Component {
    render() {
        return (
            <div>
                <h1>this is a placeholder for IssueList.</h1>
                <IssueFilter />
                <hr/>
                <IssueTable />
                <hr/>
                <IssueAdd />
            </div>
        )
    }
}
