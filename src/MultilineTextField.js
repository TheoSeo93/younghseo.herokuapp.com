
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import ReactRevealText from 'react-reveal-text';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { styles } from './Constant'
const useStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
});


class MultilineTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false, messageShow: false,
      answer: "“In order to succeed, people need a sense of self-efficacy, to struggle together with resilience to meet the inevitable obstacles and inequities of life.” - Albert Bandura",
      question: "",
      disabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
        messageShow: true
      });
    }, 1400);
  }

  handleChange(event) {
    this.setState({ question: event.target.value, disabled: false });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({isSubmitting: true});
    const formData = {"question": this.state.question}
    const requestOptions = {
      method: 'POST',
      // mode: 'cors',
      headers: {
          
      'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    try{
      this.setState({
        messageShow: false,
        disabled: true
      })
      const response = await fetch('https://ec2-18-222-75-187.us-east-2.compute.amazonaws.com/questionAnswer', requestOptions);
      if(!response.ok){
        const error = response.status;
        console.log(error.message);
        console.log(response);
      }else{
        const res = await response.json();
        this.setState({
          disabled: false,
          answer: res.answer,
          messageShow: true
        })
      }
    }catch(error){
      console.log(error);
    }
    
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <ReactRevealText transitionTime={1500} show={this.state.messageShow}  style={styles.quoteStyle} >
            {this.state.answer}
          </ReactRevealText>
        </div>
        <div>
          <ReactRevealText show={this.state.show} style={styles.askMeStyle} transitionTime={2000} delayMax={2}>
            Ask anything about me
          </ReactRevealText>
        </div>
        <TransitionGroup component="div" style={styles.formContainerStyle}>
          <CSSTransition
            classNames='transition'
            appear={true}
            enter={false}
            exit={false}
            timeout={1400}
          >
            <div>
              <form className={classes.root} onChange={this.handleChange} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    placeholder='This is a semantic QnA. You can paraphrase your questions.
                    ex) What is this site built with? / What is your ambition? / Tell me your joke, etc. '
                    multiline
                    rows={4}
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                  />
                </div>
                <div>
                  <Button disabled={this.state.disabled} onClick={this.handleSubmit} variant="contained" size="medium" color="primary" className={classes.margin}>
                    Ask
                </Button>
                </div>
              </form>
            </div>

          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }

} export default withStyles(useStyles, { withTheme: true })(MultilineTextField);