import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import ReactRevealText from 'react-reveal-text';
import ParticlesBg from 'particles-bg'
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import DescriptionIcon from '@material-ui/icons/Description';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Avatar } from '@material-ui/core';
import profile from './profile.jpg'
import MultilineTextField from './MultilineTextField'
import { styles } from './Constant'

class Content extends React.Component {

  constructor() {
    super();
    this.state = { show: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 1400);
  }
  
  render() {
    return (
      <div>
        <h1>
          <ReactRevealText show={this.state.show} style={styles.textStyle}
            transitionTime={1000} delayMax={0.01}>
            Youngho 
          </ReactRevealText>
        </h1>

        <TransitionGroup id='icons'
        >
          <CSSTransition
            classNames='transition'
            appear={true}
            enter={false}
            exit={false}
            timeout={1400}
          >
            <div>
              <Avatar style={styles.item} alt="Youngho Seo" src={profile} />
              <div id='icon-div'>
                <IconButton onClick={event => window.location.href = 'https://github.com/theoseo93'} className='icon' color="primary" size='30'><GitHubIcon /></IconButton>
                <IconButton onClick={event => window.location.href = 'https://www.linkedin.com/in/theo-seo/'} className='icon' color="primary" size='30'><LinkedInIcon /></IconButton>
                <IconButton onClick={event => window.location.href = 'https://drive.google.com/file/d/1wF-3HRaL3Ttnp7MeXeMmc4rWPzbqGdF-/view?usp=sharing'} className='icon' color="primary" size='30'><DescriptionIcon /></IconButton>
              </div>
            </div>

          </CSSTransition>


        <MultilineTextField style={styles.formStyle} ></MultilineTextField>
        </TransitionGroup >
        
      </div >
    );
  }
}

function App() {

  return (
    <div>
      <ParticlesBg type="cobweb" color="#b3cde0" bg={true} num={150}>

      </ParticlesBg>

      <Content></Content>
    </div >


  );
}

export default App;
