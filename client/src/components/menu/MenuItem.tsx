import { Box, Container, Divider, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import {MenuItemType} from "../../types/types"

interface Iprops {
  menuItem: Array<MenuItemType>
}

function MenuItem({menuItem}:Iprops) {
  const classes = useStyles();

  const itemContents = (cont: any) => {
    return (
      <Box>
        {cont.map((i: string[]) => 
            <Typography variant="caption" display="block" gutterBottom className={classes.font}>{i}</Typography>
        )}
      </Box>
    )
  }

  return (
   <Box>
       {menuItem.map((item: MenuItemType) => 
        <Box className={classes.menuItem}>
          <Divider/>
          <Container className={classes.coloumn}>
            <img className={classes.image} src={item.img}/>
          </Container>
          <Divider/>
          <Container className={classes.coloumn}>
            <Typography variant="overline" display="block" gutterBottom >{item.title}</Typography>
            {itemContents(item.content)}
          </Container>
          <Divider/>
          <Container className={classes.coloumn}>
            <Typography variant="overline" display="block" gutterBottom>{item.price} kr</Typography>
            <Typography variant="overline" display="block" gutterBottom>{item.price} kr</Typography>
          </Container>
          <Divider/>
        </Box>
       )}
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0rem 1rem 0rem"
  },
  image: {
    width: '100%',
    borderRadius: "50%"
  },
  coloumn: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "column",
  },
  font: {
    fontSize: "0.6rem"
  }
}));


export default MenuItem; 