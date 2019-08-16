import React from 'react';
import './StatItem.css'

class StatItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.skill}</td>
        <td className="midcol">{this.props.mod}</td>
        <td className="midcol">{this.props.prof}</td>
        <td className="midcol">{this.props.total}</td>
      </tr>
    );
  }
}

export default StatItem;