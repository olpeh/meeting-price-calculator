import { stylesheet } from 'typestyle';

export const styles = stylesheet({
  controls: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 8%',
    height: '95px',
    $nest: {
      '> div:first-child': {
        marginRight: '60px'
      },
      '> div:last-child': {
        marginLeft: '60px'
      }
    }
  },
  priceResult: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  totalPriceValue: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '32px'
  },
  currency: {
    textAlign: 'center'
  },
  currencySelect: {
    marginLeft: '10px',
    padding: '2px 5px'
  }
});
