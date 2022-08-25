import { extendTheme, type ThemeConfig, type ComponentDefaultProps } from '@chakra-ui/react'
import Heading from './components/App/Heading';
import Select from './components/ColumnSelector/Select';

// color mode config
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

// breakpoints
const breakpoints = {
    sm: '47em',
    md: '67.3125em'
}

// components
const components: ComponentDefaultProps = {
    Heading,
    Select,
}

const styles = {
    global: {
        'html, body': {
            boxSizing: "border-box",
            padding: 0,
            margin: 0
        }
    }
}

const theme = extendTheme({ config, components, breakpoints, styles })

export default theme