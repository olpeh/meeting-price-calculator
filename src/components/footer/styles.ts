import { stylesheet } from 'typestyle';

export const styles = stylesheet({
  footer: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '1 1 auto',
    justifyContent: 'center',
    color: 'inherit',
    textDecoration: 'none'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    color: 'inherit',
    alignItems: 'center',
    $nest: {
      '&:hover': {
        transform: 'scale(1.1)'
      },
      '&:not(:last-child)': {
        marginRight: '20px',
        marginLeft: '-10px'
      }
    }
  },
  label: {
    fontSize: '1.4vw'
  },
  logo: {
    height: '20px',
    width: '20px',
    marginLeft: '5px'
  }
});
