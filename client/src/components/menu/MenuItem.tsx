import { Box, Container, Divider, makeStyles, Theme, Typography, Button} from "@material-ui/core";
import { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {MenuItemType} from "../../types/types"

interface Iprops {
  menuItem: Array<MenuItemType>
  category: string
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
	   <Box className={classes.menuitemContainer}>
        <Box className={classes.menuItem}>
          <Container className={classes.coloumn}>
            <img className={classes.image} src={item.img}/>
          </Container>
          <Container className={classes.coloumn}>
            <Typography variant="overline" display="block" gutterBottom >{item.title}</Typography>
            {itemContents(item.content)}
          </Container>
          <Container className={classes.coloumn}>
			  <Button>
			  	<AddIcon/>
			  </Button>
			  
			  <Button>
				  <RemoveIcon/>
			  </Button>
            <Typography variant="overline" display="block" gutterBottom>{item.price} kr</Typography>
          </Container>
        </Box>
		<hr />
	   </Box>
       )}
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0rem 2rem 0rem",
	maxHeight: "4rem",
  },
  menuitemContainer: {
	display: "flex",
	flexDirection: "column"
  },
  image: {
    width: '100%',
	maxWidth: "5rem",
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