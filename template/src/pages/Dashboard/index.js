import React from 'react';
import styles from './index.less';

const FETCH_URL = '/j/search_subjects';
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    fetch(FETCH_URL + '?type=movie&tag=热门&page_limit=5&page_start=0').then(res => res.json()).then(res => {
      
      this.setState({
        list: res.subjects
      });
    });
  }
  render() {
    const { list } = this.state;
    return (
      <div className={styles.dashboard}>
        {
          list.map(item => {
            return (
              <div className={styles.item} key={item.id}>
                <img className={styles.thumnail} src={item.cover} alt="cover" />
                <div className={styles.content}>
                  <div>{item.rate}</div>
                  <div>{item.title}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
export default Dashboard;