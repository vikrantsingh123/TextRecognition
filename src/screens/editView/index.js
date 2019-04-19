import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Button, Content, Container, Text, Item, Left, Body, Right, Header, Icon, Title, Textarea } from 'native-base';

class EditView extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    editName: '',
    len: 5,
  };
  componentDidMount() {
    const index = this.props.navigation.getParam('otherParam', 1);
    const { memoStore } = this.props.store;
    this.setState({
      editName: memoStore.memoArray[index].content.join('\n'),
      len: memoStore.memoArray[index].content.length,
    });
  }

  handleChange = name => {
    this.setState({ editName: name });
  };

  save = () => {
    this.props.store.memoStore.saveContent(this.state.editName.split('\n'));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={{ backgroundColor: '#e94153' }} androidStatusBarColor="#e11145">
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>

            <Body>
              <Title>Header</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.save()}>
                <Icon type="FontAwesome5" name="save" />
              </Button>
            </Right>
          </Header>
          <Item regular>
            <Textarea
              rowSpan={this.state.len <= 3 ? 5 : this.state.len}
              placeholder="Regular Textbox"
              onChangeText={this.handleChange}
              value={this.state.editName}
            />
          </Item>
        </Content>
      </Container>
    );
  }
  renderItem = memo => {
    console.log('In render', memo);
    return (
      <Content>
        <Text>{memo}</Text>
      </Content>
    );
  };
}
export default inject('store')(observer(EditView));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
