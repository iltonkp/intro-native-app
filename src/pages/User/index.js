/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

import Api from '~/services/api';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const response = await Api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data,
    });
  }

  render() {
    const {stars} = this.state;
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
