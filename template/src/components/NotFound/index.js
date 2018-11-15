import React from 'react';
import './index.less';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>您访问的页面不存在，也可能被移除了</p>
    </div>
  );
};

export { NotFound as default };