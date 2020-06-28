import React from "react";
import { useHistory } from "react-router-dom"

import useStyles from "./styles";
import {Box, Typography, Button} from "@material-ui/core";


const ThankYou = () => {
  const history = useHistory();

  const classes = useStyles();

  return(
    <Box className={classes.wrapper}>
      <Typography variant={"h4"}>Thank you for your time</Typography>
      <Button
        className={classes.backButton}
        variant={"outlined"}
        color={"primary"}
        onClick={() => history.push("/surveys")}
      >Back</Button>
    </Box>
  )
}

export default ThankYou