// type
export type UIActionType =
  |{ type: '[UI] - Open modal'; }
  |{ type: '[UI] - Close modal'; }

// synchronous actions
export const doOpenModal = ():UIActionType => ({
  type: '[UI] - Open modal',
});

export const doCloseModal = ():UIActionType => ({
  type: '[UI] - Close modal',
});

// asynchronous actions