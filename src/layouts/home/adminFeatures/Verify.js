import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function VerifyButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="outlined" className={classes.button} onClick={()=> props.toggle()}>
        Verify
      </Button>
      
    </div>
  );
}

VerifyButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyButton);