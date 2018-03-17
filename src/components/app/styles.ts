import { stylesheet } from 'typestyle';

export const styles = stylesheet({
  flexContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'flex-start'
  },
  wrapper: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '6 1 auto',
    justifyContent: 'space-around'
  }
});
