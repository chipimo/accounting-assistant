import React = require('react');
import { Dimmer, Header, Image, Segment } from 'semantic-ui-react';
import { Typography, Button } from 'material-ui';

class Alert extends React.Component {
  state = { active: false, flip: '', content: null, height: 300 };

  flip = e => {
    if (e === 'open') {
      this.setState({ flip: 'flip' });
    } else {
      this.setState({ flip: '' });
    }
  };

  componentDidMount() {}

  HandleOnChange = (e, content, type) => {
    if (type === 'msg') {
      this.setState({ height: 100 });
    } else {
      this.setState({ height: 300 });
    }

    if (e) {
      this.setState({ active: true });
      this.setState({ content: content });

      setTimeout(() => {
        this.setState({ flip: 'flip' });
      }, 500);
    } else {
      this.setState({ active: false });
      setTimeout(() => {
        this.setState({ flip: '' });
      }, 500);
    }
  };

  handleShow = () => {
    this.setState({ active: true });
    setTimeout(() => {
      this.setState({ flip: 'flip' });
    }, 500);
  };

  handleHide = () => {
    this.setState({ active: false });
    setTimeout(() => {
      this.setState({ flip: '' });
    }, 500);
  };
  render() {
    const { active, flip, content, height } = this.state;
    return (
      <Dimmer active={active} page onClickOutside={this.handleHide}>
        <div
          className={'panel ' + flip}
          style={{
            width: '50%',
            margin: 'auto',
            marginTop: 130,
            paddingTop: 150,
            paddingLeft: 50,
          }}
        >
          <div
            className="front"
            style={{
              background: 'transparent',
              height: 300,
              width: 600,
              borderRadius: 5,
              transition: 'all 0.5s',
            }}
          />
          <div
            className="back"
            style={{
              background: '#fff',
              height: height,
              width: 600,
              color: '#3b3b3b',
              borderRadius: 5,
              transition: 'all 0.5s',
              textAlign: 'left',
            }}
          >
            {content}
            <div style={{ marginLeft: 10, marginTop: 100 }}>
              <Button
                style={{ marginRight: 20 }}
                onClick={() => this.handleHide()}
                variant="raised"
                color="primary"
              >
                try again
              </Button>
              <Button variant="raised">Need help ?</Button>
            </div>
          </div>
        </div>
      </Dimmer>
    );
  }
}

export default Alert;
