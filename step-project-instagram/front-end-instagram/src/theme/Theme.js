import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    wrapper: {
        width: '1200px',
        margin: '0 auto'
    },
    overrides: {
        MuiGridListTileBar: {
            actionIcon: {
                width: '100%'
            }
        }
    }
})
