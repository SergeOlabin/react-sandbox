import React from 'react';
import './heroes-component.scss';

interface Props { }
interface State {
    heroes: Hero[];
};
interface Hero {
    id: number,
    name: string,
    hidden?: boolean,
}

export class HeroesComponent extends React.Component<Props, State> {
    state: State = {
        heroes: [
            {
                id: 1,
                name: 'Vasya',
            },
            {
                id: 2,
                name: 'Vitalya',
            },
        ],
    };

    private _changeHeroName(newName: string) {
        const heroes = this.state.heroes;
        heroes[0].name = newName;
        this.setState({ heroes });
    }

    private _toggleHero() {
        const heroes = this.state.heroes;
        heroes[0].hidden = !heroes[0].hidden;
        this.setState({ heroes });
    }

    onClick() {
        // this._changeHeroName('Petya');
        this._toggleHero();
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.onClick()}>
                    Toggle
                </button>
                <div className="heroes-container">
                    <HeroComponent hero={this.state.heroes[0]} />
                    <HeroComponent hero={this.state.heroes[1]} />
                </div>
            </div>
        )
    }
}

interface HeroProps {
    hero: Hero,
}
interface HeroState {}

class HeroComponent extends React.Component<HeroProps, HeroState> {
    componentDidMount() {
        console.log(`${this.props.hero.name} Component Mount!`);
    }

    componentDidUpdate() {
        console.log(`${this.props.hero.name} Component Updated!`);
    }

    render() {
        return this.props.hero.hidden
            ? null
            : <h1 className="hero-name">{this.props.hero.name}</h1>;
    }
}

// const Hero: React.FC<HeroProps> = props => {
//     return props.hero.hidden
//         ? null
//         : <h1 className="hero-name">{props.hero.name}</h1>;
// }
