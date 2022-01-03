import { Box, makeStyles, Theme, Typography, Tabs, Tab} from "@material-ui/core";
import { useEffect, useState } from "react";
import * as React from 'react';
import food from "../../food"
import MenuItem from "../menu/MenuItem"

interface Iprops {
 
}

function RestaurantMenu(props: Iprops) {
	const classes = useStyles()
	const [value, setValue] = useState("0");


	useEffect(() => {
	
	  }, []);
	

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	  };
  return (
   <Box className={classes.menuPageContainer}>
       <Box className={classes.menuBackground}></Box>
	   <Box id="nameContainer" className={classes.restaurantNameContainer}>
	   		<Typography className={classes.restaurantName} variant="h2">Brygghuset</Typography>
			<Box className={classes.menuList}>
				<Box className={classes.menuTabs}>
					<Tabs
					variant="scrollable"
					aria-label="scrollable prevent tabs example"
					value={value}
					indicatorColor="secondary"
        			onChange={handleChange}
					>

						<Tab label="Dryck" value="0"></Tab>
						<Tab label="Mat" value="1"></Tab>
						<Tab label="Snacks" value="2"></Tab>
						<Tab label="Snacks" value="3"></Tab>
						<Tab label="Snacks" value="4"></Tab>
						<Tab label="Snacks" value="5"></Tab>
						<Tab label="Snacks" value="6"></Tab>

					</Tabs>
				</Box>
					<hr />
				<Box className={classes.menuItemContainer}>
				{value === "0" ? 
				
				<MenuItem menuItem = {food} category={"drink"}/>
			: null}
				</Box>
			</Box>
	   </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
	menuPageContainer: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#FEFEFE"
	},
	menuBackground: {
		zIndex: 1,
		position: "fixed",
		height: "50%",
		width: "100%",
		backgroundSize: "cover",
		backgroundPosition: "top",
		backgroundImage: `url(${"https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"})`
	},
	restaurantNameContainer: {
		position: "absolute",
		marginTop: "40%",
		zIndex: 10,
		height: "100%",
		width: "100%",
		borderRadius: "38px 38px 0px 0px",
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	},
	restaurantName: {
		fontSize: "26px",
		fontWeight: 500,
		padding: "2rem",
	},
	menuList: {
		position: "sticky",
		height: "100%",
		width: "100%",
		backgroundColor: "#FEFEFE",
		borderRadius: "6px 60px 6px 6px",
	},
	menuTabs: {
		display: "flex",
		justifyContent: "space-around",
		width: "90%",
		padding: "1rem 1rem 0rem 1rem",
	},
	menuItemContainer: {
		overflow: "scroll",
		// backgroundColor: "blue",
		height: "100%",
		width: "100%",
	}
}));


export default RestaurantMenu; 