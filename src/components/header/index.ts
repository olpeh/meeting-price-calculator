import xs from 'xstream';
import { VNode, header, h1 } from '@cycle/dom';
import { style } from 'typestyle';

const headerStyles = style({
  justifyContent: 'space-around',
  flexDirection: 'column',
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
  flex: '1 1 auto',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '2.2vw'
});

export default function Header(): xs<VNode> {
  return xs.of(
    header(`.${headerStyles}`, [h1('Header-title', 'Meeting price calculator')])
  );
}
