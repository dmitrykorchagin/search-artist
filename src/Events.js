import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Card, Icon } from 'antd';
import './App.css';

const Title = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 20px;
  line-height: 20px;
  font-weight: 600;
`;

class Events extends Component {
  state = {
    eventsInfo: [],
    error: null,
    isLoaded: false
  };

  componentDidMount() {
    const { value } = this.props;
    const token = process.env.REACT_APP_ACCESS_TOKEN;
    fetch(
      `https://rest.bandsintown.com/artists/${value}/events?app_id=${token}&date=2018-10-05%2C2018-12-31`
    )
      .then(result => result.json())
      .then(
        eventsInfo => {
          this.setState({
            isLoaded: true,
            eventsInfo
          });
        },
        error => {
          this.setState({ error });
        }
      );
  }

  render() {
    const { eventsInfo, error, isLoaded } = this.state;
    const { value } = this.props;

    return (
      <div>
        <Title>Events:</Title>
        {eventsInfo.map(event => (
          <Card
            title={event.venue.country}
            bordered={false}
            style={{ width: '100%' }}
          >
            <p>
              <Icon
                type="calendar"
                style={{ fontSize: 18, marginRight: '5px' }}
              />
              {format(event.datetime, 'DD MMMM YYYY')}
            </p>
            <p>
              <Icon
                type="environment-o"
                style={{ fontSize: 18, marginRight: '5px' }}
              />
              {event.venue.city}
            </p>
          </Card>
        ))}
      </div>
    );
  }
}

export default Events;
