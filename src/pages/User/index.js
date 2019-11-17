import React from 'react';
import PropTypes from 'prop-types';

import {Container, Teste} from './styles';

export default function User({navigation}) {
  return (
    <Container>
      <Teste>{navigation.getParam('user').name}</Teste>
    </Container>
  );
}
