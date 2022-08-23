import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Heading: ComponentStyleConfig = {
    baseStyle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '1.125rem'
    },
    sizes: {
        md: {
            fontSize: '1.125rem' // 18px
        },
        sm: {
            fontSize: '1.125rem' // 18px
        }
    },
    defaultProps: {
        size: 'md'
    }
}

export default Heading;