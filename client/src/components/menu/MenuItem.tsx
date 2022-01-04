import { Box, Container, Divider, makeStyles, Theme, Typography, Button} from "@material-ui/core";
import { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {MenuItemType} from "../../types/types";
import Incrementer from '../incrementer/Incrementer'

interface Iprops {
  menuItem: Array<MenuItemType>
  /* category: string */
}

function MenuItem({menuItem}:Iprops) {
  const classes = useStyles();
  
  const itemContents = (cont: any) => {
    return (
      <Box>
        {cont.map((i: string[]) => 
            <p className={classes.font}>{i}</p>
        )}
      </Box>
    )
  }

  return (
   <Box>
       {menuItem.map((item: MenuItemType) => 
	   <Box className={classes.menuitemContainer}>
        <Box className={classes.menuItem}>
          <Container className={classes.imageColumn}>
            <img className={classes.image} src={item.img}/>
          </Container>
          <Container className={classes.itemColumn}>
            <Typography variant="h6" display="block" gutterBottom >{item.title}</Typography>
            {itemContents(item.content)}
          </Container>
          <Container className={classes.priceColumn}>
          
			  <Box className={classes.quantityContainer}>
          <Incrementer/>
			  </Box>
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
    padding: "2rem 0rem 2rem 0rem",
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
  priceColumn: {
    display: "flex",
    justifyContent: "center",
    alignContent: "space-between",
	alignItems: "center",
    flexDirection: "column",
  },
  itemColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "space-between",
	alignItems: "flex-start",
  },
  imageColumn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  font: {
    fontSize: ".7rem",
	fontFamily: "roboto",
	color: "#928F8F"
	
  },
  quantityContainer: {
	  display: "flex",
	  justifyContent: "space-around",
	  flexDirection: "row-reverse",
	  width: "5rem",
	  background: "#FFFFFF",
	  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.06)",
	  borderRadius: "24px"
  }
}));


export default MenuItem; 