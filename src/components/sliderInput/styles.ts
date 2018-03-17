import { stylesheet } from 'typestyle';

export const styles = stylesheet({
  sliderInput: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
  },
  sliderInputUnit: {
    position: 'absolute',
    top: '34px',
    textAlign: 'right',
    right: '30px',
    zIndex: 0
  },
  numberInput: {
    background: 'rgba(150, 196, 202, 0.25)',
    color: '#96c4ca',
    borderColor: '#96c4ca',
    fontWeight: 'bold',
    padding: '7px 10px',
    fontSize: '16px'
  }
});
