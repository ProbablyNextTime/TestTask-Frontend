import React from "react"
import useStyles from "./styles"
import { Box, Typography} from "@material-ui/core";


// Default component for not existing routes
const NotFound = () => {

  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Typography variant={"h4"}>
        Not found 404
      </Typography>
    </Box>
  )
}

export default NotFound
