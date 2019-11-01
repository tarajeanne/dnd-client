import React from 'react';
import CreatorNav from '../CreatorNav/CreatorNav';
import CharacterContext from '../../contexts/CharacterContext';
import './CreatorHeader.css';

class CreatorHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.path.split('/')[3]);
    this.state = {
      screen: this.props.match.path.split('/')[3],
      instructions: {
        race: {
          title: "Choose your character's race",
          description:
            'In DnD, characters belong to different races, all with their own cultures, personality quirks, and special abilities and bonuses.'
        },

        class: {
          title: "Choose your character's class",
          description:
            "Your class will determine your character's skills, from the way they explore the land, to the way they approach combat."
        },
        background: {
          title: "Choose your charater's background",
          description:
            "What's your character's story? How did they end up on a journey? Your background influences some minor things like language, abiliy scores, and beginning items. But really, this is your chance to start thinking about who your character is."
        },
        stats: {
          title: 'Determine your starting ability scores',
          description:
            "As you go about your journey in DnD, your character will need to perform differnt actions, and the higher your scores for those actions, the more likely you are to be successful. Need to convince someone to help you? You'll need to roll for persuasion. Climbing an obstacle while adventuring? Roll for athletics. Choose your starting stats here."
        },
        alignment: {
          title: "Choose your character's alignment.",
          description:
            "Does your character desire to help people, but not care about rules? Does your character live only for their own gain? Choose your character's alignment here."
        },
        charactersheet: {
          title: 'Print out your character sheet and complete it as necessary',
          description:
            "While adventuring, you'll need a quick and easy reference to your character's information. Print out this sheet and complete it with the necessary information."
        }
      }
    };
  }
  static contextType = CharacterContext;

  render() {
    if (this.context.character) {
      return (
        <div className="creator-header">
          <CreatorNav match={this.props.match} />
          <div className="header-intro">
            <div className="header-intro-content">
              <h3 className="creator-header-title">
                {this.state.instructions[this.state.screen].title}
              </h3>
              <p className="creator-header-description">
                {this.state.instructions[this.state.screen].description}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CreatorHeader;
