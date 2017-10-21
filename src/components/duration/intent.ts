import xs from 'xstream';

export interface Actions {
  resetClickedAction$: xs<null>;
}

export default function intent(domSource): Actions {
  const resetClickedAction$: xs<null> = domSource
    .select('.reset-button')
    .events('click')
    .mapTo(null);

  return {
    resetClickedAction$
  };
}
