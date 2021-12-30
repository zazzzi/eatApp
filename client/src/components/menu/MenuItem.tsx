import { Box, Container, Divider, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import {MenuItemType} from "../../types/types"

interface Iprops {
  menuItem: Array<MenuItemType>
}

function MenuItem(props: Iprops) {
  const classes = useStyles();

  const itemContents = (cont: any) => {
    return (
      <Box>
        {cont.map((i: string[]) => 
            <Typography>{i}</Typography>
        )}
      </Box>
    )
  }

  return (
   <Box>
       {props.menuItem.map((item: MenuItemType) => 
        <Box className={classes.menuItem}>
          <Container>
            <img className={classes.image} src={item.img}/>
          </Container>
          <Container>
            <Typography>{item.title}</Typography>
            {itemContents(item.content)}
          </Container>
          <Container>
            <Typography>{item.price} kr</Typography>
            <Typography>{item.price} kr</Typography>
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
  },
  image: {
    width: '100%',
    borderRadius: "50%"
  }
}));


export default MenuItem; 