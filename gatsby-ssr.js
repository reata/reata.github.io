import React from "react";
import { ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

const theme = createTheme();

export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
    </ThemeProvider>
)
