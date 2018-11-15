import React from 'react';
import Header from '../Layout/Header';
import Slider from './Slider';
import './index.less';

const App = (props) => {
  return (
    <div className="prayer-wrapper">
      <Slider />
      <div className="prayer-wrapper-content">
        <Header />
        <div className="content-wreapper">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default App;