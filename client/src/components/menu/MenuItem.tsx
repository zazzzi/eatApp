import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import {MenuItemType} from "../../types/types"

interface Iprops {
  menuItem: Array<MenuItemType>
}

function MenuItem(props: Iprops) {

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
        <Box>
          <img src={item.img}/>
          <Typography>{item.title}</Typography>
          <Typography>{item.price}</Typography>
          {itemContents(item.content)}
        </Box>
       )}
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default MenuItem; 