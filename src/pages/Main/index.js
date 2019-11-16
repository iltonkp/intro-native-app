import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Api from '~/services/api';
import {Container, Form, Input, SubmitButton} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    headerTitle: 'Usuários',
  };

  state = {
    users: [],
    newUser: '',
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    const response = await Api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
    });

    Keyboard.dismiss();
  };

  render() {
    const {users, newUser} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
