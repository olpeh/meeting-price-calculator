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
  },
  overlay: {
    position: 'absolute',
    height: '80vh',
    width: '100%',
    left: 0,
    bottom: 0,
    background: 'rgba(255,255,255,.5)'
  }
});
