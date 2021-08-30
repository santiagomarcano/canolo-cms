import React, { ReactElement, MouseEventHandler } from "react";
import {
  Button as ChakraButton,
  CircularProgress,
  Grid,
  GridItem,
} from "@chakra-ui/react";

interface Props {

}

const MediaGallery = ({
 
}: Props): ReactElement => {
  return (
    <Grid templateColumns={["repeat(3, 1fr)"]}>
        <GridItem>
            soy imágen
        </GridItem>
    </Grid>
  );
};

export default MediaGallery;
