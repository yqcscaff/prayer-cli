import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import './index.less';

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      nav: [{
        id: '1',
        title: '概况',
        href: 'dashboard',
        active: true
      }, {
        id: '2',
        title: '预览',
        href: 'overview'
      }]
    };
  }
  componentDidMount() {
    this.judgeCurrNav();
  }
  componentWillReceiveProps(nextProps) {
    this.judgeCurrNav(nextProps);
  }
  judgeCurrNav(props) {
    const { location } = props || this.props;
    const { nav } = this.state;
    this.setState({
      nav: nav.map(item => 
        ({ ...item,
          active: location.key &&
            location.pathname.indexOf(item.href) !== -1 ? true : false }))
    });
  }
  changeNav(item) {
    const { href, id } = item;
    const { nav } = this.state;
    if (this.props.location.pathname.indexOf(href) === -1) {
      this.setState({ nav: nav.map(item => ({ ...item, active: item.id.indexOf(id) !== -1 ? true : false})) });
      this.props.history.push(href);
    }
  }
  render() {
    const { nav } = this.state;
    return (
      <div className="slider prayer-layout-sider prayer-pro-components-sider">
        <ul className="prayer-slider-ul-menu">
          {
            nav.map(item => {
              return (
                <li
                  key={item.id}
                  className={classNames('prayer-menu-item', item.active ? 'active' : '')}
                >
                  <a onClick={() => this.changeNav(item)}>{item.title}</a>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const Route = withRouter(Slider);

export { Route as default };