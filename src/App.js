import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Layout, Alert, Card, Icon } from 'antd';
import './App.css';
import ErrorAlert from './ErrorAlert';
import Events from './Events';

const Title = styled.h1`
  color: #fff;
  font-size: 96px;
  font-weight: 900;
  margin: 0;
  padding: 130px 0;
  vertical-align: center;

  @media (max-width: 768px) {
    font-size: 52px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  margin-bottom: 24px;
`;

const Search = Input.Search;
const { Header, Footer, Content } = Layout;

class App extends Component {
  state = {
    isOpen: false,
    artistInfo: {},
    error: null,
    isLoaded: false
  };

  searchClick = value => {
    this.setState({ isOpen: true });
    this.getArtistInfo(value);
  };

  getArtistInfo = value => {
    const token = process.env.REACT_APP_ACCESS_TOKEN;
    fetch(`https://rest.bandsintown.com/artists/${value}?app_id=${token}`)
      .then(result => result.json())
      .then(
        artistInfo => {
          this.setState({
            isLoaded: true,
            artistInfo
          });
        },
        error => {
          this.setState({ error });
        }
      );
  };

  render() {
    const { artistInfo, error, isLoaded } = this.state;
    return (
      <div>
        <Layout>
          <Header
            style={{
              height: '364px',
              background: '#1890ff',
              margin: '0 0 20px 0'
            }}
          >
            <Title>SEARCH ARTIST</Title>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <ErrorAlert error={error} />
            <Search
              placeholder="Введите имя исполнителя"
              onSearch={this.searchClick}
              style={{ marginBottom: '20px' }}
              size="large"
              enterButton
            />

            {artistInfo.name && (
              <Card
                title={artistInfo.name}
                bordered={false}
                style={{ width: '100%' }}
              >
                <Photo src={artistInfo.image_url} />
                {artistInfo.facebook_page_url && (
                  <a href={artistInfo.facebook_page_url}>
                    <Icon
                      type="facebook"
                      style={{ marginRight: '5px', fontSize: '18px' }}
                    />
                    {artistInfo.facebook_page_url}
                  </a>
                )}
                <Events value={artistInfo.name} />
              </Card>
            )}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Dmitry Korchagin</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
